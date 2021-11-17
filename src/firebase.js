// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn5lRipau0TBuKbKxtSHgRi1I12SQ0p5Q",
  authDomain: "crud-f91fb.firebaseapp.com",
  projectId: "crud-f91fb",
  storageBucket: "crud-f91fb.appspot.com",
  messagingSenderId: "444487142824",
  appId: "1:444487142824:web:1926ebb5ff0e0035dfe19d"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const firebaseApp=firebase.initializeApp(firebaseConfig);