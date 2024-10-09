// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ2TI4Rs5wgw39Ua7y5P9bxdrR6_4BfCw",
  authDomain: "ecoemission-323c0.firebaseapp.com",
  projectId: "ecoemission-323c0",
  storageBucket: "ecoemission-323c0.appspot.com",
  messagingSenderId: "970305517658",
  appId: "1:970305517658:web:bc7346d09dbef098910063",
  measurementId: "G-F7X1C654Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);