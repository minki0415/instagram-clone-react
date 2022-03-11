
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage"
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZMad8UiPral7M0Or7egZSOS_G5g2OS5k",
  authDomain: "react-instagram-clone-4341d.firebaseapp.com",
  projectId: "react-instagram-clone-4341d",
  storageBucket: "react-instagram-clone-4341d.appspot.com",
  messagingSenderId: "789125774455",
  appId: "1:789125774455:web:45ec91e67470c73401da72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};