# react-s-scrollable-tab-view

这是一个基于JavaScript原生实现的react组件，实现了滚动tabbar，滑动切换页面

![](https://github.com/1035901787/react-s-scrollable-tab-view/blob/master/source/20180506152400.gif)

# 安装

```sh
npm install react-s-scrollable-tab-view
```

# 使用

```js
import ScrollableTabBarView, {ScrollableTabBar, DefaultTabBar} from 'components/ScrollableTabBarView/ScrollableTabBarView';

export default class Demo extends PureComponent {

    render() {
        return (
            <ScrollableTabBarView
                handleTab={this.handleTab}
                renderTabBar={() => <ScrollableTabBar/>}>
                <div tabLabel='title1' >content1</div>
                <div tabLabel='title2' >content2</div>
                <div tabLabel='title3' >content3</div>
                <div tabLabel='title4' >content4</div>
                <div tabLabel='title5' >content5</div>
                <div tabLabel='title6' >content6</div>
            </ScrollableTabBarView>
        )
    }
}


```

# 介绍
```sh
组件自带两种tabbar:
1.ScrollableTabBar
2.DefaultTabBar
同学们可自行选择合适的tabbar，也可自定义tabbar
```

# 属性

|属性         | 值类型          | 默认值  | 描述  |
| ------------- |:-------------:| -----:| -----:|
| initItemIndex     | number | 0 | 初始化显示页面的下标 |
| underlineStyle      | object      |   无 |   tabbar下划线样式 |
| textStyle | object      |   无 |   tabbar文字样式 |
| activeTextColor | string      |   #333 |   tabbar选中时文字高亮颜色 |
| renderTabBar | any      |   DefaultTabBar |   自定义tabbar |
| handleTab | func      |   无 |   页面切换回调 |


# 内置组件(Carousel, ScrollView)

1.Carousel

```js
import {Carousel} from 'components/ScrollableTabBarView/ScrollableTabBarView';
const windows = {
	width: window.innerWidth,
	height: window.innerHeight
};
export default class DemoC extends PureComponent {

    render() {
        return (
            <Carousel className={styles.hcarousel}>
                <div className={styles.carouselItem} style={{width: windows.width, backgroundColor: '#000'}}/>
                <div className={styles.carouselItem} style={{width: windows.width, backgroundColor: 'red'}}/>
                <div className={styles.carouselItem} style={{width: windows.width, backgroundColor: 'yellow'}}/>
            </Carousel>
        )
    }
}
```
![](https://github.com/1035901787/react-s-scrollable-tab-view/blob/master/source/20180506155736.gif)

# 属性

|属性         | 值类型          | 默认值  | 描述  |
| ------------- |:-------------:| -----:| -----:|
| initItem     | number | 0 | 初始化显示页面的下标 |
| loop      | bool      |   true |   是否循环滚动 |
| auto | bool      |   true |   是否自动滚动 |
| autoplayTime | number      |   3000 |   自动滚动间隔 |
| indicator | bool      |   true |   是否显示指示器 |
| indicatorStyle | object      |   默认样式 |   指示器样式 |
| indicatorDef | any      |   默认 |   自定义指示器布局 |
| indicatorActive | any      |   默认 |   自定义选中指示器布局 |
| bounce | bool      |   false |   切换页面是否具有回弹效果 |
| pageScrollEnd | func      |   无 |   页面切换完成回调 |
| itemCls | string      |   无 |   item class |
| itemStyle | object      |   无 |   item 样式 |


2.ScrollView

```js
import {ScrollView} from 'components/ScrollableTabBarView/ScrollableTabBarView';
const windows = {
	width: window.innerWidth,
	height: window.innerHeight
};
export default class DemoS extends PureComponent {

    render() {
        return (
            <ScrollView>
                <div className={styles.carouselItem} style={{backgroundColor: '#000'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'red'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'yellow'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: '#000'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'red'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'yellow'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: '#000'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'red'}}/>
                <div className={styles.carouselItem} style={{backgroundColor: 'yellow'}}/>
            </ScrollView>
        )
    }
}
```
![](https://github.com/1035901787/react-s-scrollable-tab-view/blob/master/source/20180506160716.gif)

# 属性

|属性         | 值类型          | 默认值  | 描述  |
| ------------- |:-------------:| -----:| -----:|
| startY     | number | 0 | 纵向初始化位置 |
| startX      | number      |   0 |   横向初始化位置 |
| horizontal | bool      |   false |   是否横向显示布局，默认纵向显示 |
| bounce | bool      |   false |   滑动至顶/底部是否具有回弹效果 |
| onScroll | func      |   无 |   滑动回调 |
| onScrollEnd | func      |   无 |   滑动结束回调 |

