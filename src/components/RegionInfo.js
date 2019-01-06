import React, {Component} from 'react';
import { Table, Input } from "semantic-ui-react";
import axios from "axios";
import Footer from "./Footer";
import logo from "../logo.svg";
import MenuPage from './MenuPage';
import "semantic-ui-css/semantic.min.css";
import "./RegionInfo.css";
import "./App.css";

const TableInfo = (obj, field) => (
	<Table definition>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>id</Table.HeaderCell>
				<Table.HeaderCell>plant</Table.HeaderCell>
				<Table.HeaderCell>day</Table.HeaderCell>
				<Table.HeaderCell>period</Table.HeaderCell>
				<Table.HeaderCell>temp_min</Table.HeaderCell>
				<Table.HeaderCell>temp_max</Table.HeaderCell>
				<Table.HeaderCell>humd</Table.HeaderCell>
				<Table.HeaderCell>light</Table.HeaderCell>
				<Table.HeaderCell>near</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{(() => 
				{ return (
					obj.plants.map((e, index) => (
						<Table.Row>
							<Table.Cell>{index}</Table.Cell>
							<Table.Cell>{e.plant}</Table.Cell>
							<Table.Cell>{e.day}</Table.Cell>
							<Table.Cell>{e.period}</Table.Cell>
							<Table.Cell>{e.temp_min}</Table.Cell>
							<Table.Cell>{e.temp_max}</Table.Cell>
							<Table.Cell>{e.humd}</Table.Cell>
							<Table.Cell>{e.light}</Table.Cell>
							<Table.Cell>{e.near}</Table.Cell>
						</Table.Row>
					))
				);}
			)()}
		</Table.Body>
	</Table>
);


export default class RegionInfo extends Component {
	constructor(props) {
		super(props);
		this.state = { plants: [], results: [] };
	}
  
	handleSearchChange = (e, { value }) => {
		if (e.target.value.length === 0) {
			this.setState({
				results: []
			})
		} else {
			this.setState({
				results: this.state.plants.filter(elem => elem.plant.includes(e.target.value))
			})
		}
	}
  

	componentDidMount = () => {
		axios
			.get("http://tts.toannhu.com:3000/region/all")
			.then(response => response.data)
			.then(result => this.setState({ plants: result.data }))
			.catch(error => console.log(error));
	};


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
				<div style={{"margin":"20px"}}>
					<Input 
						focus 
						placeholder='Please input here to filter...' 
						icon='search'
						onChange={this.handleSearchChange}
					/>
					<TableInfo plants={this.state.results} />
				</div>
				<footer>
					<Footer />
				</footer>
			</div>
		);
	}
}