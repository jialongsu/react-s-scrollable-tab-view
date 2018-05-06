import React, {PureComponent} from 'react';
import styles from './styles.scss';
import ScrollView from 'components/ScrollView/ScrollView';
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

