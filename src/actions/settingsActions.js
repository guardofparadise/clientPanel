import {
	DISABLE_BALANCE_ON_ADD, 
	DISABLE_BALANCE_ON_EDIT, 
	ALLOW_REGISTRATION,
} from '../actions/types';

export const setDisabledBalanceOnAdd = () => {
	return {
		type: DISABLE_BALANCE_ON_ADD
	}
}

export const setDisabledBalanceOnEdit = () => {
	return {
		type: DISABLE_BALANCE_ON_EDIT
	}
}

export const setAllowRegistration = () => {
	return {
		type: ALLOW_REGISTRATION
	}
}