import React, { Component } from "react";
import RealtimeConnector from './RealtimeConnector';
import PlantInfo from './PlantInfo';
import RegionInfo from './RegionInfo';
import {
	Router,
	Route,
	Redirect,
  } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './LoginPage';
import history from '../history';
import withAuthenticated from './AuthenticatedComponent';
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {	
		return (
			<div className="App">
				<div className="App-intro">
					<Router history={history}>
						<div>		
							<Route exact path="/"  component={withAuthenticated(PlantInfo)}/>
							<Route path="/knowledge" component={withAuthenticated(RegionInfo)}/>
							<Route path="/realtime" component={withAuthenticated(RealtimeConnector)}/>
							<Route path="/login"  component={LoginPage}/>
						</div>
					</Router>
				</div>
			</div>
		);
	}

}

export default App;
