import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'cars-ffed2.firebaseapp.com',
  databaseURL: 'https://cars-ffed2.firebaseio.com',
  projectId: 'cars-ffed2',
  storageBucket: 'cars-ffed2.appspot.com',
  messagingSenderId: '768861179345',
};
const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp.firestore();
