import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

const db = firebase.firestore();

export const createUser = (uid, name) => {
  var today = new Date();
  today = today.toISOString().split("T")[0];

  db.collection("users")
    .doc(uid)
    .set({
      profile: {
        createdAt: today,
        completedProfile: false,
        name: name
      },
      journal: {}
    })
    .then(() => console.log("Document successfully written!"))
    .catch(error => console.error("Error writing document: ", error));
};

export const addJournalEntry = entry => {
  const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);

  const now = new Date();
  var today = Math.round(now.getTime() / 1000);

  userRef
    .update({ [`journal.${today}`]: entry })
    .then(() => console.log("Document successfully updated!"))
    .catch(error => console.error("Error updating document: ", error));
};

export const getProfile = () => {
  const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);

  return userRef
    .get()
    .then(user => {
      if (user.exists) {
        return user.data().profile;
      } else {
        console.log("No such document!");
      }
    })
    .catch(error => console.error("Error retrieving profile: ", error));
};

export const hasSubmitted = () => {
  const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);

  return userRef
    .get()
    .then(user => {
      if (user.exists) {
        console.log(user.data());
        var today = new Date();
        today = today.toISOString().split("T")[0];
        var journal = user.data().journal;

        return Object.values(journal).some(e => e.date == today);
      } else {
        console.log("No such document!");
      }
    })
    .catch(error => console.error("Error getting document:", error));
};

export default firebase;
