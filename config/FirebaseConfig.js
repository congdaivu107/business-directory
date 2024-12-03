// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB45yFW3Esiq2fewg9MM2oas1FWQrg5BDc",
  authDomain: "business-listing-app-708a2.firebaseapp.com",
  projectId: "business-listing-app-708a2",
  storageBucket: "business-listing-app-708a2.firebasestorage.app",
  messagingSenderId: "633637695999",
  appId: "1:633637695999:web:953c893be582628ce337ca",
  measurementId: "G-MBLG3PN9YX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(db)
export const storage = getStorage(app);
const analytics = getAnalytics(app);