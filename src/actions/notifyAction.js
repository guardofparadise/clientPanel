import { NOTIFY_USER } from './types';

export const notifyUser = function(message, messageType){
	console.log('hi')
	return {
		type: NOTIFY_USER,
		message,
	}
}