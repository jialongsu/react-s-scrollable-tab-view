import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ScrollView from '../ScrollView/ScrollView';
import styles from './styles.scss';
const windows = {
	width: window.innerWidth,
	height: window.innerHeight
};

export default class DefaultTabBar extends PureComponent {

    static propTypes = {
        underlineStyle: PropTypes.object,
        textStyle: PropTypes.object,
        activeTextColor: PropTypes.string,
        tabAry: PropTypes.array
    }

    static defaultProps = {
        underlineStyle: {},
        textStyle: {},
        activeTextColor: '',
        tabAry: []
    }

    state = {
        underlineStyle: {},
    }

    constructor(props) {
        super(props);
        this.activeTab = this.props.activeTab?this.props.activeTab:0;
    }

    componentDidMount() {
        this.underline = this.refs["underline"];
        this.scrollView = this.refs["scrollView"];
        if(this.props.tabAry){
            this.updateTabUnderline(this.activeTab, true);
        }
    }

    updateTabUnderline(tabIndex, time) {
        // if(tabIndex == this.activeTab)return;
        const {underlineStyle} = this.props,
            screen_width = windows.width,
            tab = this.refs[`tab_${tabIndex}`],
            tabText = this.refs[`tabText_${tabIndex}`],
            tabText_width = tabText.clientWidth,
            tab_width = tab.clientWidth,
            tab_offsetLeft = tab.offsetLeft,
            line_width = (tab_width - tabText_width)/2,
            line_left = line_width + tab_offsetLeft,
            scroller = this.scrollView.scroller,
            maxScrollX = Math.abs(scroller.maxScrollX);
        time = time?0:0.2;
        let trans = {
            "width": tabText_width,
            "left": line_left,
            "transition": `all ${time}s`,
            "MozTransition": `all ${time}s`, /* Firefox 4 */
            "WebkitTransition": `all ${time}s`, /* Safari 和 Chrome */
            "OTransition": `all ${time}s`, /* Opera */
        };
        trans = Object.assign(trans, underlineStyle);
        // let scroll_x = (tab_offsetLeft - screen_width/2) + tabText_width;
        // scroll_x = scroll_x >= maxScrollX ? maxScrollX:scroll_x;
        // scroll_x = scroll_x <= 0 ? 0:scroll_x;
        // scroller.scrollTo(-scroll_x, 0, 250);
        this.activeTab = tabIndex;
        this.setState({
            underlineStyle: trans,
        });
    }

    _handleTab(index) {
        if(index == this.activeTab)return;
        const {_handleTab} = this.props;
        this.updateTabUnderline(index);
        _handleTab &&  _handleTab(index);
        this.activeTab = index;
    }

    _renderTabItems() {
        const {tabAry, textStyle, activeTextColor} = this.props,
            activeTab = this.activeTab;
        let itemCls, itemActiveStyle;
        return tabAry.map((item, i) => {
            const {tabLabel} = item.props;
            if(activeTab == -1 || activeTab == i){
                itemCls = styles.default_activeItem;
                textStyle.color = activeTextColor;
                itemActiveStyle = textStyle;
            }else{
                itemCls = styles.default_item;
                itemActiveStyle = {};
            }
            return (
                <span onClick={this._handleTab.bind(this, i)}
                     ref={`tab_${i}`}
                     key={`tab_${i}`}
                     style={itemActiveStyle}
                     className={itemCls}>
                    <span ref={`tabText_${i}`}>{tabLabel}</span>
                </span>
            );
        });
    }

    render() {
        const {tabAry} = this.props;

        return (
            <div className={styles.tabCon}>
                <div className={styles.tabCon}>
                    <ScrollView
                        ref="scrollView"
                        bounce={false}
                        horizontal={true}>
                        <div
                            id="scrollContent"
                            className={styles.itemCon}>
                            {this._renderTabItems()}
                        </div>
                        <div
                            ref="underline"
                            style={this.state.underlineStyle}
                            className={styles.underline}/>
                    </ScrollView>
                </div>
            </div>

        );
    }
}