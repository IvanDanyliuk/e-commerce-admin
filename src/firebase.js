// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFNjTQeLrQmb_5nl-kcQ5WYba_SROqi4M",
  authDomain: "ecommerce-9b8b0.firebaseapp.com",
  projectId: "ecommerce-9b8b0",
  storageBucket: "ecommerce-9b8b0.appspot.com",
  messagingSenderId: "768589313231",
  appId: "1:768589313231:web:23252ddde2e9d5b3c9f3ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;