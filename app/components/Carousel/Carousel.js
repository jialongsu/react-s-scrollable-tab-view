import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Iscroll from '../iscroll/iscroll';
import styles from'./Carousel.scss';

export default class Carousel extends PureComponent {

	static propTypes = {
		initItem: PropTypes.number, //初始化显示item
		loop: PropTypes.bool, //是否循环滚动
		auto: PropTypes.bool, //是否自动滚动
		autoplayTime: PropTypes.number, //自动滚动间隔
		indicator: PropTypes.bool, //是否显示指示器
		indicatorStyle: PropTypes.object, //指示器样式
		indicatorDef: PropTypes.object, //指示器默认布局
		indicatorActive: PropTypes.object, //指示器选中布局
		bounce: PropTypes.bool,
		pageScrollEnd: PropTypes.func, //滑动结束回调
		itemCls: PropTypes.any,
		itemStyle: PropTypes.object
	}

	static defaultProps = {
		initItem: 0,
		loop: true,
		auto: true,
		autoplayTime: 3000,
		indicator: true,
		bounce: false,
		itemCls: '',
		itemStyle: {}
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

	componentDidMount() {
		const children = this.props.children;
		if(children && children.length > 0){
			this.initIscroll();
		}
	}

	componentDidUpdate(nextProps, nextState) {
		if(this.props.children.length != nextProps.children.length){
			this.initIscroll();
            // this.refresh();
		}
	}

	componentWillUnmount() {
		this.auto_timer && clearInterval(this.auto_timer);
		if (this.iscroll) {
			this.iscroll.destroy();
			this.iscroll = null;
		}
	}

    // shouldComponentUpdate() {
    //     return false;
    // }

	initIscroll() {
		this.initStyle();
		const {loop, auto, children, bounce, initItem} = this.props,
			{wrapperId} = this.state;
		const initItem_ = loop ? 1:initItem;
		const startX = -(this.itemWidth*initItem_);
		const options = {
			scrollX: true,
			scrollY: false,
            //在用户快速触摸屏幕时，你可以开/关势能动画。关闭此功能将大幅度提升性能
			momentum: false,
            //对齐到固定的位置和元素
			snap: true,
			snapSpeed: 400,
            //支持键盘控制
			keyBindings: false,
            //默认初始位置
			startX: startX,
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
			preventDefault: false,
			useTransition: false,
			useTransform: false,
			bounce: bounce,
		};
		this.iscroll = new Iscroll(`#${wrapperId}`, options);
		this.iscroll.currentPage.pageX = initItem_;
		this.currentPageIndex = initItem_;
		this.maxLeng = children.length;
        // 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug
		document.addEventListener('touchmove', (e) => { e.preventDefault(); }, this.isPassive() ? {
			capture: false,
			passive: false
		} : false);
		this._bindScrollEvent();
        //初始化位置
		if(loop && auto && children.length > 1){
			this.iscroll.goToPage(1, 0, 0);
		}else{
			this.iscroll.goToPage(initItem, 0, 0);
		}
        //是否自动滚动
		if(auto && children.length > 1){
			this._auto();
		}else{
			this._stopAuto();
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

	_bindScrollEvent = () => {
		const iscroll = this.iscroll;
        // iscroll.on("scrollStart",this._onScrollStart);
        // iscroll.on("scroll",this._onScroll);
		iscroll.on("scrollEnd", this._onScrollEnd);
	}

	_onScrollEnd = (e) => {
		this._loopScroll();
	}

	onTouchStart = (e) => {
		this.auto_timer && clearInterval(this.auto_timer);
	}

	onTouchEnd = (e) => {
		const {auto, children} = this.props;
		children.length > 1 && auto && this._auto();
	}

    /**
     * 循环滚动
     * @private
     */

	_loopScroll() {
		const {loop, children, pageScrollEnd} = this.props,
			indicator = this.refs["indicator"],
			_changIndicator = indicator?indicator._changIndicator:"",
			pageX = this.iscroll && this.iscroll.currentPage.pageX;
		let scrollPageIndex = -1;

		if(loop && children.length > 1){
			const length = this.loopChildrenLength || children.length,
				right = length-1,
				left = 0;
			let index = pageX-1;

			if(pageX == right){
				this.iscroll.goToPage(1, 0, 0);
				index = 0;
			}else if(pageX == left){
				this.iscroll.goToPage(length-2, 0, 0);
				index = length-2-1;
			}
			scrollPageIndex = index;
		}else{
			scrollPageIndex = pageX;
		}
		this.currentPageIndex = scrollPageIndex;
		_changIndicator && _changIndicator(scrollPageIndex);
		pageScrollEnd && pageScrollEnd(scrollPageIndex, this.iscroll);
	}

	refresh = () => {
		this.iscroll.refresh();
	}

    /**
     * 初始化布局
     */
	initStyle() {
		const itemEl = this.refs["carousel_item"];
		if(!itemEl)return;
		const wrapperEl = this.refs["wrapper"],
			scrollerEl = this.refs["scroller"],
			itemWidth = itemEl.clientWidth || itemEl.offsetWidth,
			length = this.loopChildrenLength || this.props.children.length,
			itemTotalWidth = itemWidth*length;

		wrapperEl.setAttribute("style", "width:"+itemWidth+"px");
		scrollerEl.setAttribute("style", "width:"+itemTotalWidth+"px");
		this.itemWidth = itemWidth;
	}

    /**
     * 创建循环布局
     * @returns {Array}
     * @private
     */
	_createLoopLayout() {
		const {children, loop, itemCls, itemStyle} = this.props;
		const childrenLength = children?children.length:0;
		let rightItem = '';
		let leftItem = '';
		const childrenAry = [];
		React.Children.map(children, (item, i) => {
			item = (
                <div
                    key={i}
					ref="carousel_item"
					style={itemStyle}
					className={`${styles.carousel_item} ${itemCls}`}>
                    {item}
                </div>
            );
			childrenAry.push(item);
			if(loop && children.length > 1){
				const newItem = (
                    <div
                        key={i === 0?childrenLength+2:-1}
						ref="carousel_item"
						style={itemStyle}
                        className={`${styles.carousel_item} ${itemCls}`}>
                        {item}
                    </div>
                );
				if(i === 0){
					leftItem = newItem;
				}else if(i === (childrenLength-1)){
					rightItem = newItem;
				}
			}
		});
		if(loop && children && children.length > 1){
			childrenAry.push(leftItem);
			childrenAry.unshift(rightItem);
			this.loopChildrenLength = childrenAry.length;
		}
		return childrenAry;
	}

    /**
     * 自动滚动
     * @private
     */
	_auto = () => {
		const iscroll = this.iscroll;
		this.auto_timer && clearInterval(this.auto_timer);
		this.auto_timer = setInterval(() => {
			iscroll.next();
		}, this.props.autoplayTime);
	}

	_stopAuto = () => {
		this.auto_timer && clearInterval(this.auto_timer);
	}

	goToPage = (index) => {
		this.iscroll.goToPage(index, 0, 250);
	}

	render() {
		const {
            style,
            className,
            children,
            indicator,
            indicatorDef,
            indicatorActive,
            indicatorStyle,
        } = this.props,
			{wrapperId, scrollerId} = this.state;
		const childrenAry = this._createLoopLayout();
		return (
            <div id="viewport"
                 className={`${styles.viewport} ${className}`}
                 style={style}
                 onMouseDown={this.onTouchStart}
                 onMouseUp={this.onTouchEnd}
                 onTouchStart={this.onTouchStart}
                 onTouchEnd={this.onTouchEnd}>
                <div id={wrapperId} ref="wrapper" className={styles.wrapper}>
                    <div id={scrollerId} ref="scroller" className={styles.scroller}>
                        {childrenAry}
                    </div>
                </div>
                {
                    indicator?
                        <Indicator
                            ref="indicator"
                            itemAry={children}
                            indicatorStyle={indicatorStyle}
                            indicatorDef={indicatorDef}
                            indicatorActive={indicatorActive}/>
                        :null
                }
            </div>
		)
	}
}

class Indicator extends PureComponent {
	state = {
		currentPageIndex: 0
	}

	_changIndicator = (index) => {
		if(index != this.state.currentPageIndex){
			this.setState({
				currentPageIndex: index
			});
		}
	}

	render() {
		const {itemAry, indicatorDef, indicatorActive, indicatorStyle} = this.props;
		return(
            <div className={styles.indicator} style={indicatorStyle}>
                {
                    itemAry && itemAry.map((item, i) => {
						let indicatorItem = "";
						if(i === this.state.currentPageIndex){
							indicatorItem = indicatorActive?indicatorActive:
								<div key={i} className={styles.item_active}></div>;
						}else{
							indicatorItem = indicatorDef?indicatorDef:
								<div key={i} className={styles.item_def}></div>;
						}
						return indicatorItem;
					})
                }
            </div>
		);
	}
}