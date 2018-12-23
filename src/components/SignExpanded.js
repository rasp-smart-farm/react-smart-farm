import React , {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Motion, spring} from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { Confirm } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import history from '../history';
import './LoginPage.css';

class SignExpanded extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flexState: false,
			animIsFinished: false,
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			open: false,
			message: '',
			inputTypePassword: 'password'
		};
	}

	componentDidMount () {
     	this.setState({flexState: !this.state.flexState});  
  	}


	isFinished = () => {
		this.setState({animIsFinished: true});
	}

	handleUsernameChange = (e) => {
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handleFirstNameChange = (e) => {
		this.setState({firstName: e.target.value});
	}

	handleLastNameChange = (e) => {
		this.setState({lastName: e.target.value});
	}

	signUp = (e) => {
		e.preventDefault();
		let self = this;
		axios.post('http://pi.toannhu.com:4000/users/register', {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			email: this.state.username,
			password: this.state.password
		})
			.then(function (response) {
				if (response.hasOwnProperty("data")) {
					if (response.data.error === 1) {
						self.setState({open: true, message: response.data.data});
					} else if (response.data.error === 0) {
						self.setState({open: true, message: response.data.data});
					}
				}
			})
			.catch(function (error) {
				self.setState({open: true, message: "Connection Error. Please check your internet!"});
			})
	}

	handleLogin = (e) => {
		e.preventDefault();
		let self = this;
		axios.post('http://pi.toannhu.com:4000/users/login', {
				email: this.state.username,
				password: this.state.password
			})
			.then(function (response) {
				if (response.hasOwnProperty("data")) {
					if (response.data.error === 1) {
						self.setState({open: true, message: response.data.data});
					} else if (response.data.error === 0) {
						Cookies.set("token", response.data.data);
						history.push("/");
					}
				}
			})
			.catch(function (error) {
				self.setState({open: true, message: "Connection Error. Please check your internet!"});
			})
	}

	handleMouseDown = () => {
		this.setState({ inputTypePassword: 'input' });
	}

	handleMouseUp = () => {
		this.setState({ inputTypePassword: 'password' });
	}

	refresh = () => { 
		this.setState({ open: false, username:'', password:'' })
		history.push('/login');
	}
  	closeMessage = () => this.setState({ open: false });

	render () {
		return (
			<Motion style={{
				flexVal: spring(this.state.flexState ? 8 : 1)
			}} onRest={this.isFinished}>
			{({flexVal}) =>
			<div className={this.props.type=='signIn' ? 'signInExpanded' : 'signUpExpanded'} style={{
				flexGrow: `${flexVal}`
			}}>
				{(() => {if (this.state.open) {
					return (<Confirm 
						header="Alert"
						size="large"
						cancelButton="Refresh"
						confirmButton="OK"
						open={this.state.open} 
						onCancel={this.refresh} 
						onConfirm={this.closeMessage} 
						content={this.state.message}
					/>);
				}
				})()}
				<Motion style={{ 
					opacity: spring(this.state.flexState ? 1 : 0,{stiffness: 300, damping: 17}),
					y: spring(this.state.flexState ? 0 : 50, {stiffness: 100, damping: 17})
				 }} >
						{({opacity, y}) =>
						<form className='logForm' style={{
							WebkitTransform: `translate3d(0, ${y}px, 0)`,
							transform: `translate3d(0, ${y}px, 0)`,
							opacity: `${opacity}`
						}}>
							{(() => {
								if (this.props.type == 'signIn') {
									return (
										<div>
											<h2>SIGN IN</h2>
											<Input
												id="username"
												type="text"
												placeholder="LOGIN"
												onChange={this.handleUsernameChange} />
											<Input
												id="password"
												type={this.state.inputTypePassword}
												placeholder="PASSWORD"
												onChange={this.handlePasswordChange}
												onMouseDown={this.handleMouseDown}
												onMouseUp={this.handleMouseUp} />
											<SubmitButton type={this.props.type} onClick={this.handleLogin}></SubmitButton>
											<a href="url" className='forgotPass'>Forgot password?</a>
										</div>
									)
								} else {
									return (
										<div>
											<h2>SIGN UP</h2>
											<Input
												id="fisrt_name"
												type="text"
												placeholder="FIRST NAME"
												onChange={this.handleFirstNameChange} />
											<Input
												id="last_name"
												type="text"
												placeholder="LAST NAME"
												onChange={this.handleLastNameChange} />
											<Input
												id="username"
												type="text"
												placeholder="EMAIL"
												onChange={this.handleUsernameChange} />
											<Input
												id="password"
												type={this.state.inputTypePassword}
												placeholder="PASSWORD"
												onChange={this.handlePasswordChange}
												onMouseDown={this.handleMouseDown}
												onMouseUp={this.handleMouseUp} />
											<SubmitButton type={this.props.type} onClick={this.signUp}></SubmitButton>
										</div>
									)
								}
							})()}	
						</form>
						}
				</Motion>
			</div>
			}
			</Motion>
		);
	}

}

SignExpanded.PropTypes ={
	type: PropTypes.string	
};

export default SignExpanded;