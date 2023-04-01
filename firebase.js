// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa3LYk813ZXQVYP_wErlQYnlT_2r42xdk",
  authDomain: "itec-33d26.firebaseapp.com",
  projectId: "itec-33d26",
  storageBucket: "itec-33d26.appspot.com",
  messagingSenderId: "1099159251567",
  appId: "1:1099159251567:web:21593d8d2e539fc09f3b9a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const firestore = firebase.firestore(app);
const storage = firebase.storage(app);

export { firebase };
export { auth };
export { storage };
export { firestore };