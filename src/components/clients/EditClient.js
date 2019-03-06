import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Field from '../helpers/Field';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
	constructor(props) {
		super(props);
		//create refs
		this.firstNameInput = React.createRef();
		this.lastNameInput = React.createRef();
		this.emailInput = React.createRef();
		this.phoneInput = React.createRef();
		this.balanceInput = React.createRef();
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { client, firestore, history } = this.props;
		const updClient = {
			firstName: this.firstNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			email: this.emailInput.current.value,
			phone: this.phoneInput.current.value,
			balance: this.balanceInput.current.value === '' ? 0 
			:this.balanceInput.current.value
		}

		firestore.update({ collection: 'clients', doc: client.id }, updClient)
			.then(history.push('/'))
	}

	render() {
		const { client } = this.props

		if(client) {
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
					<div className="card-header">Edit Client</div>
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<Field 
									name={'firstName'}
									type={'text'}
									text={'First Name'}
									defValue={client.firstName}
									reference={this.firstNameInput}
								/>
								<Field 
									name={'lastName'}
									type={'text'}
									text={'Last Name'}
									defValue={client.lastName}
									reference={this.lastNameInput}
								/>
								<Field 
									name={'email'}
									type={'email'}
									text={'Email'}
									length='5'
									defValue={client.email}
									reference={this.emailInput}
								/>
								<Field 
									name={'phone'}
									type={'text'}
									text={'Phone'}
									defValue={client.phone}
									reference={this.phoneInput}
								/>
								<Field 
									name={'balance'}
									type={'text'}
									text={'Balance'}
									length={'0'}
									defValue={client.balance}
									reference={this.balanceInput}
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
		} else {
			return <Spinner />
		}
	}
}

EditClient.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(props => [
		{ collection: 'clients', storeAs: 'client', doc: props.match.params.id }
	]),
	connect(({ firestore: { ordered } }, props) => ({
		client: ordered.client && ordered.client[0]
	}))
)(EditClient)