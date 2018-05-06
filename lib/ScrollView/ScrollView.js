'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /**
                    * Created by sujialong on 2017/5/25.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iscroll = require('../iscroll/iscroll');

var _iscroll2 = _interopRequireDefault(_iscroll);

var _ScrollView = require('./ScrollView.scss');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windows = {
	width: window.innerWidth,
	height: window.innerHeight
};
var ScrollView = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(ScrollView, _Component);

	function ScrollView(props) {
		(0, _classCallCheck3.default)(this, ScrollView);

		var _this = (0, _possibleConstructorReturn3.default)(this, (ScrollView.__proto__ || (0, _getPrototypeOf2.default)(ScrollView)).call(this, props));

		_this.refreshScroller = function () {
			_this.scroller.refresh();
		};

		_this._bindScrollEvent = function () {
			var scroller = _this.scroller;
			scroller.on("scrollStart", _this._onScrollStart);
			scroller.on("scroll", _this._onScroll);
			scroller.on("scrollEnd", _this._onScrollEnd);
			//解决移动端软键盘弹出无法滚动的问题
			window.onresize = function (ev) {
				if (ev.target.innerHeight == windows.height) {
					_this.refreshScroller();
				}
			};
		};

		_this._onScrollStart = function () {
			// console.log("-----_onScrollStart");
			_this.scrollTimer = setInterval(_this._onScroll, 90);
		};

		_this._onScroll = function () {
			var onScroll = _this.props.onScroll,
			    scroller = _this.scroller;
			if (!scroller) {
				clearInterval(_this.scrollTimer);
				return;
			}
			if (onScroll) {
				var _scroller = _this.scroller;
				var x = _scroller.x,
				    y = _scroller.y;

				onScroll(_scroller, x, y);
			}
			// console.log("-----_onScroll");
		};

		_this._onScrollEnd = function () {
			var onScrollEnd = _this.props.onScrollEnd;
			if (onScrollEnd) {
				var scroller = _this.scroller;
				var x = scroller.x,
				    y = scroller.y;

				onScrollEnd(scroller, x, y);
			}
			// console.log("-----_onScrollEnd");
			clearInterval(_this.scrollTimer);
		};

		_this.getScroller = function () {
			return _this.scroller;
		};

		var randomId = _this.rand();
		_this.state = {
			wrapperId: 'wrapper_' + randomId,
			scrollerId: 'scroll_' + randomId
		};
		return _this;
	}

	/**
  * 获取scroller随机id
  * @returns {string}
  */


	(0, _createClass3.default)(ScrollView, [{
		key: 'rand',
		value: function rand() {
			var pre = 0;
			var inc = 2;
			pre += inc;
			var randNum = pre + Math.random() * inc;
			randNum = randNum.toString();
			var length = randNum.length;
			var randNums = randNum.substring(length - 3, length);
			var time = new Date().getTime();
			time = time.toString();
			var timeLen = time.length;
			time = time.substring(timeLen - 3, timeLen);
			randNums += time;
			return randNums;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    startY = _props.startY,
			    startX = _props.startX,
			    horizontal = _props.horizontal,
			    name = _props.name;
			var _state = this.state,
			    wrapperId = _state.wrapperId,
			    scrollerId = _state.scrollerId;

			var _deviceOs = this.deviceOs(),
			    isPc = _deviceOs.isPc;

			var options = {
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
				bounce: false
			};

			//设置横向滚动宽度
			var scrollerEl = document.getElementById(scrollerId),
			    scrollWidth = scrollerEl.scrollWidth,
			    scrollHeight = scrollerEl.scrollHeight;
			this.oldScrollHeight = scrollHeight;
			this.oldScrollWidth = scrollWidth;
			this.scrollerEl = scrollerEl;
			if (this.props.horizontal) {
				scrollerEl.style.cssText = 'width:' + scrollWidth + 'px;';
			}
			//实例化iscroll
			this.scroller = new _iscroll2.default('#' + wrapperId, options);
			// 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug
			document.addEventListener('touchmove', function (e) {
				e.preventDefault();
			}, this.isPassive() ? {
				capture: false,
				passive: false
			} : false);
			this._bindScrollEvent();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.scroller) {
				this.scroller.destroy();
				this.scroller = null;
			}
			this.timer && clearTimeout(this.timer);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			var scrollerEl = this.scrollerEl;
			//当容器内部元素发生了变更，调用iscroll的refresh重新计算滚动条信息
			if (this.oldScrollHeight != scrollerEl.scrollHeight) {
				this.timer = setTimeout(function () {
					_this2.refreshScroller();
					_this2.oldScrollHeight = scrollerEl.scrollHeight;
				}, 250);
			}

			//滚动宽度发生变化,重新设值
			if (this.oldScrollWidth != scrollerEl.scrollWidth && this.props.horizontal) {
				scrollerEl.style.cssText = 'width:' + scrollerEl.scrollWidth + 'px;';
				this.oldScrollWidth = scrollerEl.scrollWidth;
				this.refreshScroller();
			}
		}
	}, {
		key: 'deviceOs',
		value: function deviceOs() {
			var ua = navigator.userAgent,
			    isWindowsPhone = /(?:Windows Phone)/.test(ua),
			    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			    isAndroid = /(?:Android)/.test(ua),
			    isFireFox = /(?:Firefox)/.test(ua),
			    isChrome = /(?:Chrome|CriOS)/.test(ua),
			    isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
			    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
			    isPc = !isPhone && !isAndroid && !isSymbian;
			return {
				isTablet: isTablet,
				isPhone: isPhone,
				isAndroid: isAndroid,
				isPc: isPc
			};
		}
	}, {
		key: 'isPassive',
		value: function isPassive() {
			var supportsPassiveOption = false;
			try {
				addEventListener("test", null, Object.defineProperty({}, 'passive', {
					get: function get() {
						supportsPassiveOption = true;
					}
				}));
			} catch (e) {}
			return supportsPassiveOption;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    style = _props2.style,
			    children = _props2.children,
			    name = _props2.name,
			    className = _props2.className,
			    contentCls = _props2.contentCls;
			var _state2 = this.state,
			    wrapperId = _state2.wrapperId,
			    scrollerId = _state2.scrollerId;

			return _react2.default.createElement(
				'div',
				{ id: wrapperId,
					className: _ScrollView2.default.wrapper + ' ' + className,
					style: style },
				_react2.default.createElement(
					'div',
					{ id: scrollerId,
						ref: scrollerId,
						className: _ScrollView2.default.scroller + ' ' + contentCls },
					children
				)
			);
		}
	}]);
	return ScrollView;
}(_react.Component), _class.propTypes = {
	startY: _propTypes2.default.number,
	startX: _propTypes2.default.number,
	horizontal: _propTypes2.default.bool,
	bounce: _propTypes2.default.bool,
	name: _propTypes2.default.string,
	onScroll: _propTypes2.default.func,
	onScrollEnd: _propTypes2.default.func
}, _class.defaultProps = {
	startY: 0,
	startX: 0,
	horizontal: false,
	bounce: true,
	name: 'scrollview_wrapper'
}, _temp);
exports.default = ScrollView;