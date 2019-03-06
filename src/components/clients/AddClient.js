import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Field from '../helpers/Field'

class AddClient extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: ''
	}

	onSubmit = (e) => {
		e.preventDefault();

		const newClient = this.state;

		const { firestore, history } = this.props;
		if(newClient.balance === '') newClient.balance = 0;

		firestore.add({ collection: 'clients' }, newClient)
			.then(() => history.push('/'));
	};

	onChange = (e) =>	this.setState({ [e.target.name]: e.target.value })
	

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/" className="btn btn-link">
							<i className="fa fa-arrow-circle-left" /> Back To Dashboard
						</Link>
					</div>
				</div>

				<div className="card">
					<div className="card-header">Add Client</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<Field 
								name={'firstName'}
								type={'text'}
								text={'First Name'}
								value={this.state.firstName}
								changeHandler={this.onChange}
							/>
							<Field 
								name={'lastName'}
								type={'text'}
								text={'Last Name'}
								value={this.state.lastName}
								changeHandler={this.onChange}
							/>
							<Field 
								name={'email'}
								type={'email'}
								text={'Email'}
								length='5'
								value={this.state.email}
								changeHandler={this.onChange}
							/>
							<Field 
								name={'phone'}
								type={'text'}
								text={'Phone'}
								value={this.state.phone}
								changeHandler={this.onChange}
							/>
							<Field 
								name={'balance'}
								type={'text'}
								text={'Balance'}
								length={'0'}
								value={this.state.balance}
								changeHandler={this.onChange}
							/>
							<input 
								type="submit" 
								value="submit"
								className="btn btn-primary btn-block"
							/>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

AddClient.propTypes = {
	firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(AddClient);