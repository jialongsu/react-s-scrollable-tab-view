import React, {PureComponent} from 'react';
import styles from './styles.scss';
import ScrollableTabBarView, {ScrollableTabBar} from 'react-s-scrollable-tab-view';

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

