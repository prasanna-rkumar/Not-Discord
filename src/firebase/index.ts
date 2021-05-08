import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCFbAx2SDNqx7Ev_hxsSvFuIefB2VeaGVs",
  authDomain: "not-discord-1e20a.firebaseapp.com",
  databaseURL: "https://not-discord-1e20a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "not-discord-1e20a",
  storageBucket: "not-discord-1e20a.appspot.com",
  messagingSenderId: "197992175151",
  appId: "1:197992175151:web:f18386c902afacce1698da"
};

firebase.initializeApp(firebaseConfig);

const discordFirestore = firebase.firestore();
const discordAuth = firebase.auth();
const discordDatabase = firebase.database();
const discordStorage = firebase.storage();

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const databaseTimestamp = firebase.database.ServerValue.TIMESTAMP;

export { discordFirestore, discordAuth, discordDatabase, discordStorage, firebaseTimestamp, databaseTimestamp, GoogleAuthProvider };