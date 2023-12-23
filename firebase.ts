// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvOFAe2ZPjFgB8ok8wws2rgBTxX3TzeNA",
  authDomain: "react-pokemoncollect.firebaseapp.com",
  projectId: "react-pokemoncollect",
  storageBucket: "react-pokemoncollect.appspot.com",
  messagingSenderId: "1079004891376",
  appId: "1:1079004891376:web:64d6256d920592c734da35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
