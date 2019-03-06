import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Field from '../helpers/Field';
import { notifyUser } from '../../actions/notifyAction';
import Alert from '../layout/Alert';

class Login extends Component {

	state = {
		email: '',
		password: '',
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { firebase, history, notifyUser } = this.props;
		const { email, password } = this.state;

		firebase.login({
			email,
			password
		})
		.catch(err => notifyUser('Invalid Login Credentials', 'error'))
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value })

	render() {
		const { message, messageType } = this.props.notify;
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							{message ? (<Alert message={message} messageType={messageType} />) : null}
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary"><i className="fa fa-lock" />{' '} Login</span>
							</h1>
							<form onSubmit={this.onSubmit}>
								<Field 
									type={'email'}
									name={'email'}
									text={'Email'}
									value={this.state.email}
									changeHandler={this.onChange}
								/>
								<Field 
									type={'password'}
									name={'password'}
									text={'Password'}
									value={this.state.password}
									changeHandler={this.onChange}
								/>
								<input type="submit" value="Login" className="btn btn-primary btn-block" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	firebase: PropTypes.object.isRequired
}

export default compose(
	firebaseConnect(),
	connect(
		(state,props) => ({
		notify: state.notify
	}),
	{ notifyUser }
)
)(Login);