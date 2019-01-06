import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";
import axios from 'axios';
import './ControlDevice.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { devices : this.props.devices };
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ devices: nextProps.devices });
   }

	//Them vao phan check error code 
	clickButton = (event, data) => {
		if (data["checked"] === true) {
			axios.get('http://tts.toannhu.com:3000/region/on/?node=' + this.state.devices.name + '&device=' + data["id"])
				.then(response => {
					if (response.data.error === 0) {
						let control = [];	
						let newDevices = Object.assign({}, this.state.devices);
						newDevices[data["id"]] = data["checked"];
						this.setState({devices: newDevices});
					}
				})
				.catch(function(error) {
					alert("Fail to connect server! Please try again!");
				})
		} else if (data["checked"] === false) {
			axios.get('http://tts.toannhu.com:3000/region/off/?node=' + this.state.devices.name + '&device=' + data["id"])
				.then(response => {
					if (response.data.error === 0) {
						let newDevices = Object.assign({}, this.state.devices);
						newDevices[data["id"]] = data["checked"];		
						this.setState({devices: newDevices});
					}
				})
				.catch(function(error) {
					alert("Fail to connect server! Please try again!");
				})
		}
	}

	render() {	
		if (Object.keys(this.state.devices).length > 0) {
			return (
				<div align="center">
					<br />
					<div>
						Manual &nbsp; &nbsp;
						<Checkbox id="manual" checked={!!this.state.devices.manual} onClick={this.clickButton} toggle />
					</div>
					<div>
						Pump &nbsp; &nbsp;
						<Checkbox id="w_pump" checked={!!this.state.devices.w_pump} onClick={this.clickButton} toggle />
					</div>
					<div>
						Led 1 &nbsp; &nbsp;
						<Checkbox id="w_led_1" checked={!!this.state.devices.w_led_1} onClick={this.clickButton} toggle />
					</div>
					<div>
						Led 2 &nbsp; &nbsp;
						<Checkbox id="w_led_2" checked={!!this.state.devices.w_led_2} onClick={this.clickButton} toggle />
					</div>
				</div>
			)
		} else return (
			<div></div>
		)
	}
}