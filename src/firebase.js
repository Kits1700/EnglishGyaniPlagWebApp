// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVDOvDKBfXnuPZfGH9nSTHLM38hoJ5F6o",
  authDomain: "fbeg-375009.firebaseapp.com",
  databaseURL: "https://fbeg-375009-default-rtdb.firebaseio.com",
  projectId: "fbeg-375009",
  storageBucket: "fbeg-375009.appspot.com",
  messagingSenderId: "971831979037",
  appId: "1:971831979037:web:0bc3160d5c3d7cbf3beaf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app); 
export default firebase;
