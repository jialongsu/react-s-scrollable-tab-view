'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _ScrollView = require('components/ScrollView/ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windows = {
    width: window.innerWidth,
    height: window.innerHeight
};
var ScrollableTabBar = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(ScrollableTabBar, _PureComponent);

    function ScrollableTabBar(props) {
        (0, _classCallCheck3.default)(this, ScrollableTabBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScrollableTabBar.__proto__ || (0, _getPrototypeOf2.default)(ScrollableTabBar)).call(this, props));

        _this.state = {
            underlineStyle: {}
        };

        _this.activeTab = _this.props.activeTab ? _this.props.activeTab : 0;
        return _this;
    }

    (0, _createClass3.default)(ScrollableTabBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.underline = this.refs["underline"];
            this.scrollView = this.refs["scrollView"];
            if (this.props.tabAry) {
                this.updateTabUnderline(this.activeTab, true);
            }
        }
    }, {
        key: 'updateTabUnderline',
        value: function updateTabUnderline(tabIndex, time) {
            // if(tabIndex == this.activeTab)return;
            var underlineStyle = this.props.underlineStyle,
                screen_width = windows.width,
                tab = this.refs['tab_' + tabIndex],
                tabText = this.refs['tabText_' + tabIndex],
                tabText_width = tabText.clientWidth,
                tab_width = tab.clientWidth,
                tab_offsetLeft = tab.offsetLeft,
                line_width = (tab_width - tabText_width) / 2,
                line_left = line_width + tab_offsetLeft,
                scroller = this.scrollView.scroller,
                maxScrollX = Math.abs(scroller.maxScrollX);

            time = time ? 0 : 0.2;
            var trans = {
                "width": tabText_width,
                "left": line_left,
                "transition": 'all ' + time + 's',
                "MozTransition": 'all ' + time + 's', /* Firefox 4 */
                "WebkitTransition": 'all ' + time + 's', /* Safari 和 Chrome */
                "OTransition": 'all ' + time + 's' /* Opera */
            };
            trans = (0, _assign2.default)(trans, underlineStyle);
            var scroll_x = tab_offsetLeft - screen_width / 2 + tabText_width;
            scroll_x = scroll_x >= maxScrollX ? maxScrollX : scroll_x;
            scroll_x = scroll_x <= 0 ? 0 : scroll_x;
            scroller.scrollTo(-scroll_x, 0, 250);
            this.activeTab = tabIndex;
            this.setState({
                underlineStyle: trans
            });
        }
    }, {
        key: '_handleTab',
        value: function _handleTab(index) {
            if (index == this.activeTab) return;
            var _handleTab = this.props._handleTab;

            this.updateTabUnderline(index);
            _handleTab && _handleTab(index);
            this.activeTab = index;
        }
    }, {
        key: '_renderTabItems',
        value: function _renderTabItems() {
            var _this2 = this;

            var _props = this.props,
                tabAry = _props.tabAry,
                textStyle = _props.textStyle,
                activeTextColor = _props.activeTextColor,
                activeTab = this.activeTab;

            var itemCls = void 0,
                itemActiveStyle = void 0;
            return tabAry.map(function (item, i) {
                var tabLabel = item.props.tabLabel;

                if (activeTab == -1 || activeTab == i) {
                    itemCls = _styles2.default.activeItem;
                    textStyle.color = activeTextColor;
                    itemActiveStyle = textStyle;
                } else {
                    itemCls = _styles2.default.item;
                    itemActiveStyle = {};
                }
                return _react2.default.createElement(
                    'span',
                    { onClick: _this2._handleTab.bind(_this2, i),
                        ref: 'tab_' + i,
                        key: 'tab_' + i,
                        style: itemActiveStyle,
                        className: itemCls },
                    _react2.default.createElement(
                        'span',
                        { ref: 'tabText_' + i },
                        tabLabel
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tabAry = this.props.tabAry;


            return _react2.default.createElement(
                'div',
                { className: _styles2.default.tabCon },
                _react2.default.createElement(
                    'div',
                    { className: _styles2.default.tabCon },
                    _react2.default.createElement(
                        _ScrollView2.default,
                        {
                            ref: 'scrollView',
                            bounce: false,
                            horizontal: true },
                        _react2.default.createElement(
                            'div',
                            {
                                id: 'scrollContent',
                                className: _styles2.default.itemCon },
                            this._renderTabItems()
                        ),
                        _react2.default.createElement('div', {
                            ref: 'underline',
                            style: this.state.underlineStyle,
                            className: _styles2.default.underline })
                    )
                )
            );
        }
    }]);
    return ScrollableTabBar;
}(_react.PureComponent), _class.propTypes = {
    underlineStyle: _propTypes2.default.object,
    textStyle: _propTypes2.default.object,
    activeTextColor: _propTypes2.default.string,
    tabAry: _propTypes2.default.array
}, _class.defaultProps = {
    underlineStyle: {},
    textStyle: {},
    activeTextColor: '',
    tabAry: []
}, _temp);
exports.default = ScrollableTabBar;