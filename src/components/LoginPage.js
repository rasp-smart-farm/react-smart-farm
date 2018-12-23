import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NavigationPanel from './NavigationPanel';
import Modal from './Modal';
import Footer from "./Footer";
import './LoginPage.css';

export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	handleSubmit = (e) => {
		this.setState({ mounted: false });
		e.preventDefault();
	}

	render() {
		const {mounted} = this.state;

		let child;
		let test = 12;

		if(mounted) {
			child = (
				<div className="LoginPage_test">
					<NavigationPanel></NavigationPanel>
					<Modal onSubmit={this.handleSubmit}/>
				</div>
			);
		}
		
		return(
			<div className="App">
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
				<footer>
					<Footer />
				</footer>
			</div>
		);
	}
}