// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMxLG6mEwQutaJZxPBdWkAoY7Lh4t81F0",
  authDomain: "portfolio-web-app-95ba7.firebaseapp.com",
  projectId: "portfolio-web-app-95ba7",
  storageBucket: "portfolio-web-app-95ba7.appspot.com",
  messagingSenderId: "895463517379",
  appId: "1:895463517379:web:c006f716c41a7855db8676",
  databaseURL: "https://portfolio-web-app-95ba7-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
