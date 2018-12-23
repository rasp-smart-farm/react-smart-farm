import React from 'react';
import PropTypes from 'prop-types';
import {MdVisibility} from 'react-icons/md';
import './LoginPage.css';

const Input = (props) => {

	let iconVisibility = null;

	if (props.id == 'password') {
		iconVisibility = (
			<MdVisibility className='iconVisibility' onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} />
		);
	}

	return (
		<div className="Input">
			<input 
				id={props.id}
				autoComplete="false"
				required
				type={props.type}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
			{iconVisibility}
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	placeholer: PropTypes.string
};


export default Input;