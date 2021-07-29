import firebase from 'firebase';
//  Add the Firebase products that you want to use
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQu0I0nSbhsDGPf095KpaQnlZzshlecMQ',
  authDomain: 'whatsapp-7-49c4c.firebaseapp.com',
  projectId: 'whatsapp-7-49c4c',
  storageBucket: 'whatsapp-7-49c4c.appspot.com',
  messagingSenderId: '865833023782',
  appId: '1:865833023782:web:098041c221619f82e8e9e7',
};
// Initialize Firebase:
// for spa=>  const firebase = Firebase.initializeApp(firebaseConfig);
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

//  Add the Firebase products that you want to use
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
