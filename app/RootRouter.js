/**
/**
 * Created by sujialong on 2017/6/7.
 */
import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import App from './pages/App';
import demo from './pages/demo/demo';
import demoCarouse from './pages/demo/demo-carouse';
import demoScrollview from './pages/demo/demo-scrollview';


export default class RootRouter extends Component{

    constructor(props) {
		super(props);
    }

    _renderRoute = ({history, location}) => {

		return(
            <div id="reactroot">
                <App key={location.pathname}>
                    <Switch>
                        <Route location={location} exact path="/" component={demo}/>
						<Route location={location} path="/demoList" component={demo}/>
						<Route location={location} path="/demoCarouse" component={demoCarouse}/>
						<Route location={location} path="/demoScrollview" component={demoScrollview}/>
						<Route location={location} component={demo}/>
                    </Switch>
                </App>
			</div>
		)
	}

    render(){
        const {NODE_ENV, BUILD_TYPE} = process.env;
        const supportsHistory = 'pushState' in window.history;
        const basename = NODE_ENV == "dev" ? "/" : "/pet/petUser"
        return(
            <BrowserRouter
				basename={basename}
				keyLength={12}
				forceRefresh={!supportsHistory}>
				<Route render={this._renderRoute} />
			</BrowserRouter>
        );
    }
}
