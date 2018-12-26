import React from 'react';
import { Confirm } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import history from '../history';

export default function withAuthenticated(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { info: [], isLoggedIn: false, open: false, show: false };
		}

		async componentWillMount() {
			let token = Cookies.get('token');
			let self = this;
			if (token !== undefined) {		
				await axios.get('http://pi.toannhu.com:4000/users/getInfo', {headers:{'Authorization': `Bearer ${token}`}})
					.then(function (response) {
						if (response.data.error === 0 && response.data.hasOwnProperty("data")) {
							if (response.data.data[0]["role_id"] === 2) {
								self.setState(() => ({
									isLoggedIn: true,
									isAuthorize: true,
									show: false,
									open: true,
									info: response.data.data[0]
								}))
							} else {
								self.setState(() => ({
									show: true,
									open: true,
									info: response.data.data[0]
								}))
							}
						}
					})
					.catch(function (error) {
					});
			} else {
				self.setState(() => ({
					open: true
				}))
			}
		}

		goLoginPage = () => { 
			this.setState({ open: false });
			history.push('/login');
		}
		  
		closeMessage = () => this.setState({ open: false });

		render() {
			if (this.state.show) {
				return (<Confirm 
					header="Alert Message"
					size="large"
					cancelButton="Cancel"
					confirmButton="Login"
					open={this.state.open} 
					onCancel={this.closeMessage} 
					onConfirm={this.goLoginPage} 
					content="This account is not authorized to access. Please contact admin for futher information."
				/>);
			}
			
			if (this.state.isLoggedIn) {
				return (<WrappedComponent info={this.state.info} {...this.props} />);
			} else {
				return (<Confirm 
					header="Alert Message"
					size="large"
					cancelButton="Cancel"
					confirmButton="Login"
					open={this.state.open} 
					onCancel={this.closeMessage} 
					onConfirm={this.goLoginPage} 
					content="You must have login first"
				/>);
			}
		}
  	};
}