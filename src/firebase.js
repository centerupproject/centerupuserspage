import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, update, remove, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDQ-1eTj6G1HQ9u-mX1xQ62ZNI4GUQFXko",
    authDomain: "formquestions-108ff.firebaseapp.com",
    databaseURL: "https://formquestions-108ff-default-rtdb.firebaseio.com",
    projectId: "formquestions-108ff",
    storageBucket: "formquestions-108ff.firebasestorage.app",
    messagingSenderId: "793913587324",
    appId: "1:793913587324:web:b9d040c64b627e24cd3bf9",
    measurementId: "G-RHMGMD05T5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, push, update, remove, onValue };
