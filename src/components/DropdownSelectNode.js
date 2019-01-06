import React, {Component} from 'react';
import { Dropdown } from "semantic-ui-react";
import ControlDevice from './ControlDevice';
import Cookies from 'js-cookie';
import axios from 'axios';
import './DropdownSelectNode.css';

const SelectNode = (e) => {
	let options = e.node.map(item => ({ text: item, value: item }));
	return (
		<Dropdown placeholder='Select Node to Control' selection options={options} onChange={e.onChange}/>
	)
}

export default class DropdownSelectNode extends Component {
	constructor(props) {
		super(props);
		this.state = { devices: {}, node: [] };
	} 

	handleChange = (e, { value }) => {
		let self = this;
		axios.get('http://tts.toannhu.com:3000/region/getDevices?node=' + value)
			.then(response => {
				self.setState(() => ({
					devices: response.data.data[0]
				}))
			})
			.catch(error => console.log(error));
	}

	componentDidMount = () => {
		let token = Cookies.get('token');
		let self = this;
		axios.get('http://pi.toannhu.com:4000/users/getInfo', {headers:{'Authorization': `Bearer ${token}`}})
			.then(function (response) {
				if (response.data.error === 0 && response.data.hasOwnProperty("data")) {
					if (response.data.data[0]["role_id"] === 2) {
						let node_list = JSON.parse(response.data.data[0]["node_control"])["name"];
						if (node_list.length > 0) {
							self.setState(() => ({
								node: node_list
							}))	
						}
						
					}
				}
			})
			.catch(function (error) {
			});
	}

	render() {
		return (
			<div>
				<SelectNode node={this.state.node} onChange={this.handleChange}/>
				<ControlDevice devices={this.state.devices} />
			</div>
		)
	}
}