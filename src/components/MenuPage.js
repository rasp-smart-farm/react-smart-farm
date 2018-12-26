import React, { Component } from 'react';
import { Menu, Button, Label,Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import history from '../history';
import "./MenuPage.css";

export default class MenuPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	}

	handleLogout = (event, data) => {
		Cookies.remove('token');
		history.push('/login');
	}

	render() {
		const { activeItem } = this.state
		console.log(this.props)
		return (
		<Menu secondary>
			<Menu.Item>
          		<img src='https://react.semantic-ui.com/logo.png' />
        	</Menu.Item>

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
			
			<Menu.Item fluid position='right'>
				<Label as='a' pointing='right' color='teal' as={Link} to='/'>
					Welcome, {this.props.first_name + ' ' + this.props.last_name}
				</Label>
				<Button compact circular color='facebook' size='small' onClick={this.handleLogout}>Logout</Button>	
			</Menu.Item>
		</Menu>
		)
	}
}
