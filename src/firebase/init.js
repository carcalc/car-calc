import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBYuGiqmWUk02JCjqIpVDaP2J0-NcVzlZ8',
  authDomain: 'cars-ffed2.firebaseapp.com',
  databaseURL: 'https://cars-ffed2.firebaseio.com',
  projectId: 'cars-ffed2',
  storageBucket: 'cars-ffed2.appspot.com',
  messagingSenderId: '768861179345'
};
const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp.firestore();
