import React, {Component} from 'react';
import { subscribe } from 'mqtt-react';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./RealtimeInfo.css";
import "./App.css";

class TableMqtt extends Component {
	constructor(props) {
		super(props);
		this.state = { field: [] };
	} 

	timeConverter = (timestamp) => {
		var a = new Date(timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
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
							
							if (this.state.field.length > 0 && this.state.field != null) {
								return (
									this.state.field.sort((a, b) => a.id > b.id).map(e => (
										<Table.Row>
											<Table.Cell>{this.timeConverter(time)}</Table.Cell>
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
	topic: 'realtime'
})(TableMqtt);
