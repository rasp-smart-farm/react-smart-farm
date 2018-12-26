import React, { Component } from "react";
import { Connector } from "mqtt-react";
import RealtimeInfo from './RealtimeInfo';
import Footer from "./Footer";
import logo from "../logo.svg";
import MenuPage from './MenuPage';
import "./App.css";

export default class RealtimeConnector extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Smart Farm Monitor</h1>
				</header>
				<div className="menu">
					<MenuPage {...this.props.info} />
				</div>
				<Connector mqttProps="ws://tts.toannhu.com:8080">
					<RealtimeInfo data={this.props.data} />
				</Connector>
				<footer>
					<Footer />
				</footer>
			</div>
		)
	}
}

