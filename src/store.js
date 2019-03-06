import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
	apiKey: "AIzaSyDulaWBkVDTSaGMZQdvLrbDOktf5Lu_ces",
	authDomain: "react-client-panel-6122a.firebaseapp.com",
	databaseURL: "https://react-client-panel-6122a.firebaseio.com",
	projectId: "react-client-panel-6122a",
	storageBucket: "react-client-panel-6122a.appspot.com",
	messagingSenderId: "695748182746",
};

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

const createStoreWithFirebase = compose(reactReduxFirebase(firebase,rrfConfig),reduxFirestore(firebase))(createStore);

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	notify: notifyReducer,
	settings: settingsReducer
})

const initialState = {};

const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store;