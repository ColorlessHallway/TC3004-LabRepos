// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4htQGkKVb_-DJovtZV76Fs2IGqtFGIkM",
  authDomain: "lab2-eb175.firebaseapp.com",
  projectId: "lab2-eb175",
  storageBucket: "lab2-eb175.firebasestorage.app",
  messagingSenderId: "225294219150",
  appId: "1:225294219150:web:28b8649ba8a8222e5f16df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}