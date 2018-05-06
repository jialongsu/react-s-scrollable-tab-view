# react-s-scrollable-tab-view

这是一个基于JavaScript原生实现的react组件，实现了滚动tabbar，滑动切换页面

![这里写图片描述](https://github.com/1035901787/react-s-listview/blob/master/source/20180506112030.gif)

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

