import React from 'react';

export default (props) => {
	const { name, type, text, value, changeHandler, length, defValue, reference } = props;
	return (
		<div className="form-group">
		<label htmlFor="firstName">{text}</label>
		<input 
			type={type} 
			className="form-control"
			name={name}
			minLength={length ? parseFloat(length) : parseFloat('2')}
			required
			onChange={changeHandler}
			value={value}
			defaultValue={defValue}
			ref={reference}
		/>
		</div>
	)
}