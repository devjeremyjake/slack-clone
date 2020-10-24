// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAwZWPXICklN902I0vrazgP56Rg6J7EK7c',
	authDomain: 'slack-clone-72638.firebaseapp.com',
	databaseURL: 'https://slack-clone-72638.firebaseio.com',
	projectId: 'slack-clone-72638',
	storageBucket: 'slack-clone-72638.appspot.com',
	messagingSenderId: '60587692044',
	appId: '1:60587692044:web:746bba5ae03c133cfb1e29',
	measurementId: 'G-C9H0YVB6Z3',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
