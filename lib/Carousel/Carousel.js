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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iscroll = require('../iscroll/iscroll');

var _iscroll2 = _interopRequireDefault(_iscroll);

var _Carousel = require('./Carousel.scss');

var _Carousel2 = _interopRequireDefault(_Carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carousel = (_temp = _class = function (_PureComponent) {
	(0, _inherits3.default)(Carousel, _PureComponent);

	function Carousel(props) {
		(0, _classCallCheck3.default)(this, Carousel);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Carousel.__proto__ || (0, _getPrototypeOf2.default)(Carousel)).call(this, props));

		_this._bindScrollEvent = function () {
			var iscroll = _this.iscroll;
			// iscroll.on("scrollStart",this._onScrollStart);
			// iscroll.on("scroll",this._onScroll);
			iscroll.on("scrollEnd", _this._onScrollEnd);
		};

		_this._onScrollEnd = function (e) {
			_this._loopScroll();
		};

		_this.onTouchStart = function (e) {
			_this.auto_timer && clearInterval(_this.auto_timer);
		};

		_this.onTouchEnd = function (e) {
			var _this$props = _this.props,
			    auto = _this$props.auto,
			    children = _this$props.children;

			children.length > 1 && auto && _this._auto();
		};

		_this.refresh = function () {
			_this.iscroll.refresh();
		};

		_this._auto = function () {
			var iscroll = _this.iscroll;
			_this.auto_timer && clearInterval(_this.auto_timer);
			_this.auto_timer = setInterval(function () {
				iscroll.next();
			}, _this.props.autoplayTime);
		};

		_this._stopAuto = function () {
			_this.auto_timer && clearInterval(_this.auto_timer);
		};

		_this.goToPage = function (index) {
			_this.iscroll.goToPage(index, 0, 250);
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


	(0, _createClass3.default)(Carousel, [{
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
			var children = this.props.children;
			if (children && children.length > 0) {
				this.initIscroll();
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(nextProps, nextState) {
			if (this.props.children.length != nextProps.children.length) {
				this.initIscroll();
				// this.refresh();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.auto_timer && clearInterval(this.auto_timer);
			if (this.iscroll) {
				this.iscroll.destroy();
				this.iscroll = null;
			}
		}

		// shouldComponentUpdate() {
		//     return false;
		// }

	}, {
		key: 'initIscroll',
		value: function initIscroll() {
			this.initStyle();
			var _props = this.props,
			    loop = _props.loop,
			    auto = _props.auto,
			    children = _props.children,
			    bounce = _props.bounce,
			    initItem = _props.initItem,
			    wrapperId = this.state.wrapperId;

			var initItem_ = loop ? 1 : initItem;
			var startX = -(this.itemWidth * initItem_);
			var options = {
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
				bounce: bounce
			};
			this.iscroll = new _iscroll2.default('#' + wrapperId, options);
			this.iscroll.currentPage.pageX = initItem_;
			this.currentPageIndex = initItem_;
			this.maxLeng = children.length;
			// 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug
			document.addEventListener('touchmove', function (e) {
				e.preventDefault();
			}, this.isPassive() ? {
				capture: false,
				passive: false
			} : false);
			this._bindScrollEvent();
			//初始化位置
			if (loop && auto && children.length > 1) {
				this.iscroll.goToPage(1, 0, 0);
			} else {
				this.iscroll.goToPage(initItem, 0, 0);
			}
			//是否自动滚动
			if (auto && children.length > 1) {
				this._auto();
			} else {
				this._stopAuto();
			}
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
		key: '_loopScroll',


		/**
   * 循环滚动
   * @private
   */

		value: function _loopScroll() {
			var _props2 = this.props,
			    loop = _props2.loop,
			    children = _props2.children,
			    pageScrollEnd = _props2.pageScrollEnd,
			    indicator = this.refs["indicator"],
			    _changIndicator = indicator ? indicator._changIndicator : "",
			    pageX = this.iscroll && this.iscroll.currentPage.pageX;

			var scrollPageIndex = -1;

			if (loop && children.length > 1) {
				var length = this.loopChildrenLength || children.length,
				    right = length - 1,
				    left = 0;
				var index = pageX - 1;

				if (pageX == right) {
					this.iscroll.goToPage(1, 0, 0);
					index = 0;
				} else if (pageX == left) {
					this.iscroll.goToPage(length - 2, 0, 0);
					index = length - 2 - 1;
				}
				scrollPageIndex = index;
			} else {
				scrollPageIndex = pageX;
			}
			this.currentPageIndex = scrollPageIndex;
			_changIndicator && _changIndicator(scrollPageIndex);
			pageScrollEnd && pageScrollEnd(scrollPageIndex, this.iscroll);
		}
	}, {
		key: 'initStyle',


		/**
   * 初始化布局
   */
		value: function initStyle() {
			var itemEl = this.refs["carousel_item"];
			if (!itemEl) return;
			var wrapperEl = this.refs["wrapper"],
			    scrollerEl = this.refs["scroller"],
			    itemWidth = itemEl.clientWidth || itemEl.offsetWidth,
			    length = this.loopChildrenLength || this.props.children.length,
			    itemTotalWidth = itemWidth * length;

			wrapperEl.setAttribute("style", "width:" + itemWidth + "px");
			scrollerEl.setAttribute("style", "width:" + itemTotalWidth + "px");
			this.itemWidth = itemWidth;
		}

		/**
   * 创建循环布局
   * @returns {Array}
   * @private
   */

	}, {
		key: '_createLoopLayout',
		value: function _createLoopLayout() {
			var _props3 = this.props,
			    children = _props3.children,
			    loop = _props3.loop,
			    itemCls = _props3.itemCls,
			    itemStyle = _props3.itemStyle;

			var childrenLength = children ? children.length : 0;
			var rightItem = '';
			var leftItem = '';
			var childrenAry = [];
			_react2.default.Children.map(children, function (item, i) {
				item = _react2.default.createElement(
					'div',
					{
						key: i,
						ref: 'carousel_item',
						style: itemStyle,
						className: _Carousel2.default.carousel_item + ' ' + itemCls },
					item
				);
				childrenAry.push(item);
				if (loop && children.length > 1) {
					var newItem = _react2.default.createElement(
						'div',
						{
							key: i === 0 ? childrenLength + 2 : -1,
							ref: 'carousel_item',
							style: itemStyle,
							className: _Carousel2.default.carousel_item + ' ' + itemCls },
						item
					);
					if (i === 0) {
						leftItem = newItem;
					} else if (i === childrenLength - 1) {
						rightItem = newItem;
					}
				}
			});
			if (loop && children && children.length > 1) {
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

	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    style = _props4.style,
			    className = _props4.className,
			    children = _props4.children,
			    indicator = _props4.indicator,
			    indicatorDef = _props4.indicatorDef,
			    indicatorActive = _props4.indicatorActive,
			    indicatorStyle = _props4.indicatorStyle,
			    _state = this.state,
			    wrapperId = _state.wrapperId,
			    scrollerId = _state.scrollerId;

			var childrenAry = this._createLoopLayout();
			return _react2.default.createElement(
				'div',
				{ id: 'viewport',
					className: _Carousel2.default.viewport + ' ' + className,
					style: style,
					onMouseDown: this.onTouchStart,
					onMouseUp: this.onTouchEnd,
					onTouchStart: this.onTouchStart,
					onTouchEnd: this.onTouchEnd },
				_react2.default.createElement(
					'div',
					{ id: wrapperId, ref: 'wrapper', className: _Carousel2.default.wrapper },
					_react2.default.createElement(
						'div',
						{ id: scrollerId, ref: 'scroller', className: _Carousel2.default.scroller },
						childrenAry
					)
				),
				indicator ? _react2.default.createElement(Indicator, {
					ref: 'indicator',
					itemAry: children,
					indicatorStyle: indicatorStyle,
					indicatorDef: indicatorDef,
					indicatorActive: indicatorActive }) : null
			);
		}
	}]);
	return Carousel;
}(_react.PureComponent), _class.propTypes = {
	initItem: _propTypes2.default.number, //初始化显示item
	loop: _propTypes2.default.bool, //是否循环滚动
	auto: _propTypes2.default.bool, //是否自动滚动
	autoplayTime: _propTypes2.default.number, //自动滚动间隔
	indicator: _propTypes2.default.bool, //是否显示指示器
	indicatorStyle: _propTypes2.default.object, //指示器样式
	indicatorDef: _propTypes2.default.object, //指示器默认布局
	indicatorActive: _propTypes2.default.object, //指示器选中布局
	bounce: _propTypes2.default.bool,
	pageScrollEnd: _propTypes2.default.func, //滑动结束回调
	itemCls: _propTypes2.default.any,
	itemStyle: _propTypes2.default.object
}, _class.defaultProps = {
	initItem: 0,
	loop: true,
	auto: true,
	autoplayTime: 3000,
	indicator: true,
	bounce: false,
	itemCls: '',
	itemStyle: {}
}, _temp);
exports.default = Carousel;

var Indicator = function (_PureComponent2) {
	(0, _inherits3.default)(Indicator, _PureComponent2);

	function Indicator() {
		var _ref;

		var _temp2, _this2, _ret;

		(0, _classCallCheck3.default)(this, Indicator);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = Indicator.__proto__ || (0, _getPrototypeOf2.default)(Indicator)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
			currentPageIndex: 0
		}, _this2._changIndicator = function (index) {
			if (index != _this2.state.currentPageIndex) {
				_this2.setState({
					currentPageIndex: index
				});
			}
		}, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret);
	}

	(0, _createClass3.default)(Indicator, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props5 = this.props,
			    itemAry = _props5.itemAry,
			    indicatorDef = _props5.indicatorDef,
			    indicatorActive = _props5.indicatorActive,
			    indicatorStyle = _props5.indicatorStyle;

			return _react2.default.createElement(
				'div',
				{ className: _Carousel2.default.indicator, style: indicatorStyle },
				itemAry && itemAry.map(function (item, i) {
					var indicatorItem = "";
					if (i === _this3.state.currentPageIndex) {
						indicatorItem = indicatorActive ? indicatorActive : _react2.default.createElement('div', { key: i, className: _Carousel2.default.item_active });
					} else {
						indicatorItem = indicatorDef ? indicatorDef : _react2.default.createElement('div', { key: i, className: _Carousel2.default.item_def });
					}
					return indicatorItem;
				})
			);
		}
	}]);
	return Indicator;
}(_react.PureComponent);