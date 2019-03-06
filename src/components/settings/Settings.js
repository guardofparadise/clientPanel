import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	setDisabledBalanceOnAdd,
	setDisabledBalanceOnEdit,
	setAllowRegistration
} from '../../actions/settingsActions';

class Settings extends Component {

	disableBalanceOnAddChange = () => {
		const { setDisabledBalanceOnAdd } = this.props;
		setDisabledBalanceOnAdd();
	}

	disableBalanceOnEditChange = () => {
		const { setDisabledBalanceOnEdit } = this.props;
		setDisabledBalanceOnEdit();
	}

	allowRegistrationChange = () => {
		const { setAllowRegistration } = this.props;
		setAllowRegistration();
	}

	render() {
		const { disabledBalanceOnAdd,
						disabledBalanceOnEdit,
						allowRegistration } = this.props.settings;
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/" className="btn btn-link">
							<i className="fa fa-arrow-circle-left" /> Back to Dashboard
						</Link>
					</div>
				</div>

				<div className="card">
					<div className="card-header">Edit Settings</div>
					<div className="card-body">
						<form>
							<div className="form-group">
								<label>Allow Registration</label>{' '}
								<input 
									type="checkbox"
									name="allowRegistration"
									checked={!!allowRegistration}
									onChange={this.allowRegistrationChange}
								/>
							</div>

							<div className="form-group">
								<label>Disable Balance On Add</label>{' '}
								<input 
									type="checkbox"
									name="allowRegistration"
									checked={!!disabledBalanceOnAdd}
									onChange={this.disableBalanceOnAddChange}
								/>
							</div>

							<div className="form-group">
								<label>Disable Balance On Edit</label>{' '}
								<input 
									type="checkbox"
									name="allowRegistration"
									checked={!!disabledBalanceOnEdit}
									onChange={this.disableBalanceOnEditChange}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

Settings.propTypes = {
	settings: PropTypes.object.isRequired,
	setDisabledBalanceOnAdd: PropTypes.func.isRequired,
	setDisabledBalanceOnEdit: PropTypes.func.isRequired,
	setAllowRegistration: PropTypes.func.isRequired
}

export default connect((state,props) => ({
	auth: state.firebase.auth,
	settings: state.settings
}),
{	setDisabledBalanceOnAdd,
	setDisabledBalanceOnEdit,
	setAllowRegistration }
)(Settings);