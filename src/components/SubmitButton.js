import React from 'react';
import PropTypes from 'prop-types';
import {MdArrowForward} from 'react-icons/md';
import {FaGooglePlus, FaTwitter, FaFacebook} from 'react-icons/fa';
import {Motion, spring} from 'react-motion';
import history from '../history';
import './LoginPage.css';

const SubmitButton = (props) => {

	let socialNets = null;

	if (props.type == 'signIn') {
		socialNets = (
			<div className='socialNets'>
				<FaGooglePlus className='socialNetsIcon' onClick={() => window.location = "https://plus.google.com/"}/>
				<FaTwitter className='socialNetsIcon' onClick={() => window.location = "https://twitter.com/"} />
				<FaFacebook className='socialNetsIcon'onClick={() => window.location = "https://www.facebook.com/nguyen.thanhphuc.370"} />
			</div>
		)
	} else {
		socialNets = (
			<div className='socialNets'>
			</div>
		)
	}
	return (
		<div className={'submitButton'}>
			{socialNets}
			<button className={props.type=='signIn' ? 'submitSignIn' : 'submitSignUp'} onClick={props.onClick}><MdArrowForward/></button>
		</div>
	);
} 

SubmitButton.PropTypes = {
	type: PropTypes.String
};

export default SubmitButton;