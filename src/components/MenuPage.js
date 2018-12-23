import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./MenuPage.css";

export default class MenuPage extends Component {
	constructor(props) {
		super(props);
		this.state = { field: [] };
	}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	}

	render() {
		const { activeItem } = this.state

		return (
		<Menu>
			<Menu.Item
			name='standard'
			active={activeItem === 'standard'}
			onClick={this.handleItemClick}
			as={Link} to='/' 
			>
			Standard DB
			</Menu.Item>

			<Menu.Item
			name='knowledge'
			active={activeItem === 'knowledge'}
			onClick={this.handleItemClick}
			as={Link} to='/knowledge' 
			>
			Knowledge DB
			</Menu.Item>

			<Menu.Item
			name='realtime'
			active={activeItem === 'realtime'}
			onClick={this.handleItemClick}
			as={Link} to='/realtime' 
			>
			Realtime
			</Menu.Item>
		</Menu>
		)
	}
}
