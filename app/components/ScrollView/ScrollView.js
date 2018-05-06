/**
 * Created by sujialong on 2017/5/25.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Iscroll from '../iscroll/iscroll';
import styles from './ScrollView.scss';
const windows = {
	width: window.innerWidth,
	height: window.innerHeight
};
export default class ScrollView extends Component{

	static propTypes = {
		startY: PropTypes.number,
		startX: PropTypes.number,
		horizontal: PropTypes.bool,
		bounce: PropTypes.bool,
		name: PropTypes.string,
		onScroll: PropTypes.func,
		onScrollEnd: PropTypes.func,
	}

	static defaultProps = {
		startY: 0,
		startX: 0,
		horizontal: false,
		bounce: true,
		name: 'scrollview_wrapper'
	}

	constructor(props) {
		super(props);
		const randomId = this.rand();
		this.state = {
			wrapperId: 'wrapper_'+randomId,
			scrollerId: 'scroll_'+randomId
		};
	}

    /**
     * 获取scroller随机id
     * @returns {string}
     */
	rand() {
		let pre = 0;
		const inc = 2;
		pre += inc;
		let randNum = pre + (Math.random() * inc);
		randNum = randNum.toString();
		const length = randNum.length;
		let randNums = randNum.substring(length-3, length);
		let time = new Date().getTime();
		time = time.toString();
		const timeLen = time.length;
		time = time.substring(timeLen-3, timeLen);
		randNums += time;
		return randNums;
	}

	componentDidMount(){
		const {startY, startX, horizontal, name} = this.props;
		const {wrapperId, scrollerId} = this.state;
		const {isPc} = this.deviceOs();
		const options = {
			scrollX: horizontal,
			scrollY: !horizontal,
			mouseWheel: true,
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
			preventDefault: isPc,
			startY: startY,
			startX: startX,
			scrollbars: false,
            // useTransition:false,
            // useTransform:false,
            // 禁止缩放
			zoom: false,
            // 拖拽超过上下界后出现弹射动画效果
			bounce: false,
		};

        //设置横向滚动宽度
		const scrollerEl = document.getElementById(scrollerId),
			scrollWidth = scrollerEl.scrollWidth,
			scrollHeight = scrollerEl.scrollHeight;
		this.oldScrollHeight = scrollHeight;
		this.oldScrollWidth = scrollWidth;
		this.scrollerEl = scrollerEl;
		if(this.props.horizontal){
			scrollerEl.style.cssText = `width:${scrollWidth}px;`;
		}
        //实例化iscroll
		this.scroller = new Iscroll(`#${wrapperId}`, options);
        // 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug
		document.addEventListener('touchmove', (e) => { e.preventDefault(); }, this.isPassive() ? {
			capture: false,
			passive: false
		} : false);
		this._bindScrollEvent();
	}

	componentWillUnmount() {
		if (this.scroller) {
			this.scroller.destroy();
			this.scroller = null;
		}
		this.timer && clearTimeout(this.timer);
	}

	componentDidUpdate() {
		const scrollerEl = this.scrollerEl;
        //当容器内部元素发生了变更，调用iscroll的refresh重新计算滚动条信息
		if (this.oldScrollHeight != scrollerEl.scrollHeight) {
			this.timer = setTimeout(() => {
				this.refreshScroller();
				this.oldScrollHeight = scrollerEl.scrollHeight;
			}, 250);
		}

        //滚动宽度发生变化,重新设值
		if((this.oldScrollWidth != scrollerEl.scrollWidth) && this.props.horizontal){
			scrollerEl.style.cssText = `width:${scrollerEl.scrollWidth}px;`;
			this.oldScrollWidth = scrollerEl.scrollWidth;
			this.refreshScroller();
		}
	}

	refreshScroller = () => {
		this.scroller.refresh();
	}

	deviceOs() {
		var ua = navigator.userAgent,
			isWindowsPhone = /(?:Windows Phone)/.test(ua),
			isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			isAndroid = /(?:Android)/.test(ua),
			isFireFox = /(?:Firefox)/.test(ua),
			isChrome = /(?:Chrome|CriOS)/.test(ua),
			isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
			isPhone = /(?:iPhone)/.test(ua) && !isTablet,
			isPc = !isPhone && !isAndroid && !isSymbian;
		return {
			isTablet: isTablet,
			isPhone: isPhone,
			isAndroid: isAndroid,
			isPc: isPc
		};
	}

	_bindScrollEvent = () => {
		var scroller = this.scroller;
		scroller.on("scrollStart", this._onScrollStart);
		scroller.on("scroll", this._onScroll);
		scroller.on("scrollEnd", this._onScrollEnd);
        //解决移动端软键盘弹出无法滚动的问题
		window.onresize = (ev) => {
			if(ev.target.innerHeight == windows.height){
				this.refreshScroller();
			}
		}
	}

	isPassive() {
		let supportsPassiveOption = false;
		try {
			addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function () {
					supportsPassiveOption = true;
				}
			}));
		} catch(e) {}
		return supportsPassiveOption;
	}

	_onScrollStart = () => {
        // console.log("-----_onScrollStart");
		this.scrollTimer = setInterval(this._onScroll, 90);
	}

	_onScroll = () => {
		const onScroll = this.props.onScroll,
			scroller = this.scroller;
		if(!scroller){
			clearInterval(this.scrollTimer);
			return;
		}
		if(onScroll){
			const scroller = this.scroller;
			const {x, y} = scroller;
			onScroll(scroller, x, y);
		}
        // console.log("-----_onScroll");
	}

	_onScrollEnd = () => {
		const onScrollEnd = this.props.onScrollEnd;
		if(onScrollEnd){
			const scroller = this.scroller;
			const {x, y} = scroller;
			onScrollEnd(scroller, x, y);
		}
        // console.log("-----_onScrollEnd");
		clearInterval(this.scrollTimer);
	}

	getScroller = () =>{
		return this.scroller;
	}

	render(){
		const {style, children, name, className, contentCls} = this.props;
		const {wrapperId, scrollerId} = this.state;
		return (
            <div id={wrapperId}
                 className={`${styles.wrapper} ${className}`}
                 style={style}>
                <div id={scrollerId}
                     ref={scrollerId}
                     className={`${styles.scroller} ${contentCls}`}>
                    {children}
                </div>
            </div>
		);

	}
}