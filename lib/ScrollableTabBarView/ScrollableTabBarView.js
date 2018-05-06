'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultTabBar = exports.ScrollableTabBar = exports.default = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _ScrollableTabBar = require('./ScrollableTabBar');

var _ScrollableTabBar2 = _interopRequireDefault(_ScrollableTabBar);

var _DefaultTabBar = require('./DefaultTabBar');

var _DefaultTabBar2 = _interopRequireDefault(_DefaultTabBar);

var _Carousel = require('../Carousel/Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windows = {
    width: window.innerWidth,
    height: window.innerHeight
};

var ScrollableTabBarView = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(ScrollableTabBarView, _PureComponent);

    function ScrollableTabBarView(props) {
        (0, _classCallCheck3.default)(this, ScrollableTabBarView);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScrollableTabBarView.__proto__ || (0, _getPrototypeOf2.default)(ScrollableTabBarView)).call(this, props));

        _this.getCarousel = function () {
            return _this.refs["carousel"];
        };

        _this.pageScrollEnd = function (pageIndex, scroller) {
            if (pageIndex === _this.lastIndex) return;
            var handleTab = _this.props.handleTab;

            var tScrollableTabBar = _this.refs["tScrollableTabBar"];
            _this._reLoadpage(pageIndex);
            tScrollableTabBar.updateTabUnderline(pageIndex);
            _this.lastIndex = pageIndex;
            handleTab && handleTab(pageIndex);
        };

        _this._handleTab = function (index) {
            var handleTab = _this.props.handleTab;

            _this.getCarousel().goToPage(index);
            _this._reLoadpage(index);
            handleTab && handleTab(index);
        };

        var renderPageIndexs = [];
        var initItemIndex = _this.props.initItemIndex;

        renderPageIndexs.push(initItemIndex);
        _this.state = {
            renderPageIndexs: renderPageIndexs
        };
        return _this;
    }

    (0, _createClass3.default)(ScrollableTabBarView, [{
        key: '_reLoadpage',
        value: function _reLoadpage(index) {
            var oldRenderPageIndexs = this.state.renderPageIndexs;

            if (oldRenderPageIndexs.indexOf(index) < 0) {
                oldRenderPageIndexs.push(index);
                var renderPageIndexs = [].concat((0, _toConsumableArray3.default)(new _set2.default(oldRenderPageIndexs))); //去重
                this.setState({
                    renderPageIndexs: renderPageIndexs
                });
            }
        }
    }, {
        key: '_renderTabBar',
        value: function _renderTabBar(props) {
            if (this.props.renderTabBar === false) {
                return null;
            } else if (this.props.renderTabBar) {
                return _react2.default.cloneElement(this.props.renderTabBar(props), props);
            } else {
                return _react2.default.createElement(_DefaultTabBar2.default, props);
            }
        }
    }, {
        key: '_renderPage',
        value: function _renderPage() {
            var children = this.props.children,
                router = this.props.router,
                pageAry = [],
                renderPageIndexs = this.state.renderPageIndexs;

            var page = void 0;
            _react2.default.Children.forEach(children, function (item, index) {
                if (renderPageIndexs.indexOf(index) >= 0) {
                    page = _react2.default.createElement(
                        StaticComponent,
                        { className: _styles2.default.staticComponent, key: 'list-' + index },
                        item
                    );
                } else {
                    page = _react2.default.createElement('div', { key: 'list-' + index, style: { width: windows.width, height: '100%' } });
                }
                pageAry.push(page);
            });
            return pageAry;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                underlineStyle = _props.underlineStyle,
                textStyle = _props.textStyle,
                activeTextColor = _props.activeTextColor,
                initItemIndex = _props.initItemIndex;

            var tabBarProps = {
                ref: 'tScrollableTabBar',
                _handleTab: this._handleTab,
                underlineStyle: underlineStyle,
                textStyle: textStyle,
                activeTextColor: activeTextColor,
                activeTab: initItemIndex,
                tabAry: children
            };

            if (children.length <= 0) return null;
            return _react2.default.createElement(
                'div',
                { className: _styles2.default.conatiner },
                this._renderTabBar(tabBarProps),
                _react2.default.createElement(
                    _Carousel2.default,
                    {
                        ref: 'carousel',
                        initItem: initItemIndex,
                        style: { height: '100%', width: '100%' },
                        itemStyle: { width: windows.width },
                        indicator: false,
                        auto: false,
                        loop: false,
                        pageScrollEnd: this.pageScrollEnd },
                    this._renderPage()
                )
            );
        }
    }]);
    return ScrollableTabBarView;
}(_react.PureComponent), _class.propTypes = {
    initItemIndex: _propTypes2.default.number,
    underlineStyle: _propTypes2.default.object,
    textStyle: _propTypes2.default.object,
    activeTextColor: _propTypes2.default.string,
    renderTabBar: _propTypes2.default.any,
    handleTab: _propTypes2.default.func
}, _class.defaultProps = {
    initItemIndex: 0
}, _temp);
exports.default = ScrollableTabBarView;

var StaticComponent = function (_PureComponent2) {
    (0, _inherits3.default)(StaticComponent, _PureComponent2);

    function StaticComponent() {
        (0, _classCallCheck3.default)(this, StaticComponent);
        return (0, _possibleConstructorReturn3.default)(this, (StaticComponent.__proto__ || (0, _getPrototypeOf2.default)(StaticComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(StaticComponent, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.props.className;

            return _react2.default.createElement(
                'div',
                { className: className, style: { width: windows.width, height: '100%' } },
                this.props.children
            );
        }
    }]);
    return StaticComponent;
}(_react.PureComponent);

exports.ScrollableTabBar = _ScrollableTabBar2.default;
exports.DefaultTabBar = _DefaultTabBar2.default;