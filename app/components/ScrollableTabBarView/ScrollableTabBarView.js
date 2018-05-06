import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ScrollableTabBar from './ScrollableTabBar';
import DefaultTabBar from './DefaultTabBar';
import Carousel from '../Carousel/Carousel';
import styles from './styles.scss';
const windows = {
	width: window.innerWidth,
	height: window.innerHeight
};

class ScrollableTabBarView extends PureComponent {

    static propTypes = {
        initItemIndex: PropTypes.number,
        underlineStyle: PropTypes.object,
        textStyle: PropTypes.object,
        activeTextColor: PropTypes.string,
        renderTabBar: PropTypes.any,
        handleTab: PropTypes.func
    }

    static defaultProps = {
        initItemIndex: 0,
    }

    constructor(props) {
        super(props);
        const renderPageIndexs = [];
        const {initItemIndex} = this.props;
        renderPageIndexs.push(initItemIndex);
        this.state = {
            renderPageIndexs: renderPageIndexs
        };
    }

    getCarousel = () => {
        return this.refs["carousel"];
    }

    pageScrollEnd = (pageIndex, scroller) => {
        if(pageIndex === this.lastIndex)return;
        const {handleTab} = this.props;
        const tScrollableTabBar = this.refs["tScrollableTabBar"];
        this._reLoadpage(pageIndex);
        tScrollableTabBar.updateTabUnderline(pageIndex);
        this.lastIndex = pageIndex;
        handleTab && handleTab(pageIndex);
    }

    _handleTab = (index) => {
        const {handleTab} = this.props;
        this.getCarousel().goToPage(index);
        this._reLoadpage(index);
        handleTab && handleTab(index);
    }

    _reLoadpage(index) {
        const oldRenderPageIndexs = this.state.renderPageIndexs;

        if(oldRenderPageIndexs.indexOf(index) < 0){
            oldRenderPageIndexs.push(index);
            const renderPageIndexs = [...new Set(oldRenderPageIndexs)];//去重
            this.setState({
                renderPageIndexs: renderPageIndexs
            });
        }
    }

    _renderTabBar(props) {
        if (this.props.renderTabBar === false) {
            return null;
        } else if (this.props.renderTabBar) {
            return React.cloneElement(this.props.renderTabBar(props), props);
        } else {
            return <DefaultTabBar {...props}/>;
        }
    }

    _renderPage() {
        const {children} = this.props,
            router = this.props.router,
            pageAry = [],
            renderPageIndexs = this.state.renderPageIndexs;
        let page;
        React.Children.forEach(children, (item, index) => {
            if(renderPageIndexs.indexOf(index) >= 0){
                page =
                    (
                        <StaticComponent className={styles.staticComponent} key={`list-${index}`} >
                            {item}
                        </StaticComponent>
                    );
            }else{
                page = <div key={`list-${index}`} style={{width: windows.width, height: '100%'}}/>;
            }
            pageAry.push(page);
        });
        return pageAry;
    }

    render() {
        const {children, underlineStyle, textStyle, activeTextColor, initItemIndex} = this.props;
        const tabBarProps = {
            ref: 'tScrollableTabBar',
            _handleTab: this._handleTab,
            underlineStyle: underlineStyle,
            textStyle: textStyle,
            activeTextColor: activeTextColor,
            activeTab: initItemIndex,
            tabAry: children,
        }

        if(children.length <= 0)return null;
        return (
            <div className={styles.conatiner} >
                {this._renderTabBar(tabBarProps)}
                <Carousel
                    ref="carousel"
                    initItem={initItemIndex}
                    style={{height: '100%', width: '100%'}}
                    itemStyle={{width: windows.width}}
                    indicator={false}
                    auto={false}
                    loop={false}
                    pageScrollEnd={this.pageScrollEnd}>
                    {this._renderPage()}
                </Carousel>
            </div>
        );
    }
}


class StaticComponent extends PureComponent{

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {className} = this.props;
        return (
            <div className={className} style={{width: windows.width, height: '100%'}}>
                {this.props.children}
            </div>
        );
    }
}

export default ScrollableTabBarView;
export {
    ScrollableTabBar,
    DefaultTabBar
}
