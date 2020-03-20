import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "covid19journalapp.firebaseapp.com",
  databaseURL: "https://covid19journalapp.firebaseio.com",
  projectId: "covid19journalapp",
  storageBucket: "covid19journalapp.appspot.com",
  messagingSenderId: "649300743563",
  appId: "1:649300743563:web:0b44e5cb183a6553d44b8e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
