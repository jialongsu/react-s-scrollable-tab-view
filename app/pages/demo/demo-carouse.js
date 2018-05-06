import React, {PureComponent} from 'react';
import styles from './styles.scss';
import {Carousel} from 'react-s-scrollable-tab-view';

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

