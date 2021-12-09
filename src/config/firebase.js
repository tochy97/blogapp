import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWhlqEWLNlAZ5EDdXeyWpuhp-sN_yRZqQ",
    authDomain: "blogutacse.firebaseapp.com",
    projectId: "blogutacse",
    storageBucket: "blogutacse.appspot.com",
    messagingSenderId: "609259074654",
    appId: "1:609259074654:web:31350ed9ddbb1f68b0b0cf",
    measurementId: "G-WS578X3C8K"
  };

const base = firebase.initializeApp(firebaseConfig);
export const auth = base.auth();
export const store = base.firestore();
export const storage = base.storage();