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

export const createUser = () => {
  db.collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      profile: {},
      journal: {}
    })
    .then(() => console.log("Document successfully written!"))
    .catch(error => console.error("Error writing document: ", error));
};

export const addJournalEntry = entry => {
  const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);

  var today = new Date();
  today = today.toISOString();

  userRef
    .update({ [`journal.${today}`]: entry })
    .then(() => console.log("Document successfully updated!"))
    .catch(error => console.error("Error updating document: ", error));
};

export default firebase;

/*
{
  users: {
    FAXdNAn1x1fiaVeUWo7MSljp2P72: {
      profile: {
        testedPositiveOn: 2020-03-12
        age: 42,
        gender: male
      },
      journal: {
        2020-03-06: {
          question1: answer1,
          question2: answer2
        },
        2020-03-07: {
          question1: answer1,
          question2: answer2
        },
        2020-03-08: {
          question1: answer1,
          question2: answer2
        }
      }
    },
    K6inrKTO1XNrV4KsdD5eP7e8lM63: {
      profile: {
        testedPositiveOn: undefined
        age: 74,
        gender: male
      },
      journal: {
        2020-03-02: {
          question1: answer1,
          question2: answer2
        },
        2020-03-03: {
          question1: answer1,
          question2: answer2
        }
      }
    }
  }
}
*/
