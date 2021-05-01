import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWj5THCSULp3JoM8gTFATmMuFHFuOfcIU",
  authDomain: "this-is-not-discord.firebaseapp.com",
  projectId: "this-is-not-discord",
  storageBucket: "this-is-not-discord.appspot.com",
  messagingSenderId: "228380085202",
  appId: "1:228380085202:web:a8a3a1c426b64ed5b1160b",
  measurementId: "G-GDRP1DBXMB"
};

firebase.initializeApp(firebaseConfig);

const discordFirestore = firebase.firestore();
const discordAuth = firebase.auth();

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { discordFirestore, discordAuth, firebaseTimestamp, GoogleAuthProvider };