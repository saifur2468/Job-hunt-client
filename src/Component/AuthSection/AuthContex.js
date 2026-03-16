// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAispOHp0z7ZtM25B7Yrue_ObIokfmBbhM",
  authDomain: "job-hunting-ce638.firebaseapp.com",
  projectId: "job-hunting-ce638",
  storageBucket: "job-hunting-ce638.firebasestorage.app",
  messagingSenderId: "256186577207",
  appId: "1:256186577207:web:395f16805af25f71d3aab2",
  measurementId: "G-RHWLWT50BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();