import React, {Component} from 'react';
import { subscribe } from 'mqtt-react';
import { Table, Dropdown } from "semantic-ui-react";
import ControlDevice from './ControlDevice';
import Cookies from 'js-cookie';
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import "./RealtimeInfo.css";
import "./App.css";

const DropdownSelectNode = (e) => {
	let options = e.node.map(item => ({ text: item, value: item }));
	return (
		<Dropdown placeholder='Select Node to Control' selection options={options} onChange={e.onChange}/>
	)
}

class TableMqtt extends Component {
	constructor(props) {
		super(props);
		this.state = { field: [], devices: {}, node: [] };
	} 

	handleChange = (e, { value }) => {
		let self = this;
		axios.get('http://pi.toannhu.com:3000/region/getDevices?node=' + value)
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
	
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.data !== this.props.data) { 
			if (!this.state.field.some(e => e.name === this.props.data[0].name)) {
			this.setState({
				field: [...this.state.field, this.props.data[0]]});
			} else {
				let id = this.state.field.findIndex(e => e.name === this.props.data[0].name);
				let obj = this.state.field.slice();
				if (id > -1) {
					obj.splice(id, 1);
				}
				this.setState({
					field: [...obj, this.props.data[0]]});
			}
		}
	}

	render() {
		return (
			<div>
				<DropdownSelectNode node={this.state.node} onChange={this.handleChange}/>
				<ControlDevice mqtt={this.props} devices={this.state.devices} />
				<Table definition>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>time</Table.HeaderCell>
							<Table.HeaderCell>id</Table.HeaderCell>
							<Table.HeaderCell>name</Table.HeaderCell>
							<Table.HeaderCell>day</Table.HeaderCell>
							<Table.HeaderCell>temp</Table.HeaderCell>
							<Table.HeaderCell>humd</Table.HeaderCell>
							<Table.HeaderCell>light</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{(() => {
							const time = Date.now();
							let date = new Date(time);
							let dateStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - "
									+ date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
							if (this.state.field.length > 0 && this.state.field != null) {
								return (
									this.state.field.sort((a, b) => a.id > b.id).map(e => (
										<Table.Row>
											<Table.Cell>{dateStr}</Table.Cell>
											<Table.Cell>{e.id}</Table.Cell>
											<Table.Cell>{e.name}</Table.Cell>
											<Table.Cell>{e.day}</Table.Cell>
											<Table.Cell>{e.temp}</Table.Cell>
											<Table.Cell>{e.humd}</Table.Cell>
											<Table.Cell>{e.light}</Table.Cell>
										</Table.Row>
								)
							))
						}})()
					}	
					</Table.Body>
				</Table>
			</div>
		)}
}

export default subscribe({
	topic: 'myTopic'
})(TableMqtt);
