// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrmTZ9SIKB6Yw0AuoyC_A5dkEXqtCePlg",
    authDomain: "swipe-and-shop-dev-40004.firebaseapp.com",
    projectId: "swipe-and-shop-dev-40004",
    storageBucket: "swipe-and-shop-dev-40004.firebasestorage.app",
    messagingSenderId: "93397163048",
    appId: "1:93397163048:web:843629c026e70384cee91d",
    measurementId: "G-VRPY8608KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);