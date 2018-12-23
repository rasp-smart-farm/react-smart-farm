import React, {Component} from 'react';
import { subscribe } from 'mqtt-react';
import { Table, Checkbox } from "semantic-ui-react";
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import "./RealtimeInfo.css";
import "./App.css";

const ControlLed = (e) => {
	return (
		<div align="center">
			{(() => "Led " + e.id + "  " )()}
			<Checkbox id={e.id} defaultChecked={e.status} toggle onClick={(event, data) => clickButton(event, data, e.props)} />
		</div>
	)}

//Them vao phan check error code 
const clickButton = (event, data, props) => {
	if (data["checked"] === true) {
		axios.get('http://pi.toannhu.com:3000/region/on/' + data["id"])
			.then(response => {
				if (response.data.error === 0) {
					const { mqtt } = props;
					mqtt.publish('myTopic', "Hello World");
				}
			})
			.catch(error => {
				alert("Fail to connect server! Please try again!");
			})
	} else if (data["checked"] === false) {
		axios.get('http://pi.toannhu.com:3000/region/off/' + data["id"])
			.then(response => {
				if (response.data.error === 0) {
					const { mqtt } = props;
					mqtt.publish('myTopic', "Hello World");
				}
			})
			.catch(error => {
				alert("Fail to connect server! Please try again!");
			})
	}
}

class TableMqtt extends Component {
	constructor(props) {
		super(props);
		this.state = { field: [], leds: [] };
	} 

	componentDidMount = () => {
		axios.get('http://pi.toannhu.com:3000/region/getLedStatus')
			.then(response => response.data)
			.catch(error => console.log(error))
			.then(result => this.setState({ leds: result.data }));
	}
	
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.data !== this.props.data) { 
			if (!this.state.field.some(e => e.name === this.props.data[0].name)) {
			this.setState(prevState => ({
				field: [...this.state.field, this.props.data[0]]}));
			} else {
				let id = this.state.field.findIndex(e => e.name === this.props.data[0].name);
				let obj = this.state.field.slice();
				if (id > -1) {
					obj.splice(id, 1);
				}
				this.setState(prevState => ({
					field: [...obj, this.props.data[0]]}));
			}
		}
	}

	render() {
		return (
			<div>
				{this.state.leds.map(e => {
					if (Object.keys(e).length !== 0 && e.constructor === Object) {
						return <ControlLed id={e.id} status={e.status} props={this.props} />;
					}
				})}
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
