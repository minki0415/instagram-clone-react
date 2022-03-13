// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAxa3J6opOD2BilZ0w-eHqGmKDLlKNXVA",
  authDomain: "instagram-clone-react-c8459.firebaseapp.com",
  projectId: "instagram-clone-react-c8459",
  storageBucket: "instagram-clone-react-c8459.appspot.com",
  messagingSenderId: "53794565312",
  appId: "1:53794565312:web:a3366191439a9ebc0a9125",
  measurementId: "G-LLEK67E3FQ"
  // apiKey: "AIzaSyBxy2s22WF6E-y40O-ld7hzzLPDnSw6vnc",
  // authDomain: "react-instagram-ab8a2.firebaseapp.com",
  // projectId: "react-instagram-ab8a2",
  // storageBucket: "react-instagram-ab8a2.appspot.com",
  // messagingSenderId: "416758190507",
  // appId: "1:416758190507:web:b5f77f79842731bf6982ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get Data from Firebase
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const analytics = getAnalytics(app);

// export Data
export {db, auth, storage, analytics};