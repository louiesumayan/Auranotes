// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDs-zFH33Eb1NVpjQfK9-g0pNyDquv9zo8',
  authDomain: 'auradb-bb6d2.firebaseapp.com',
  projectId: 'auradb-bb6d2',
  storageBucket: 'auradb-bb6d2.appspot.com',
  messagingSenderId: '173403710895',
  appId: '1:173403710895:web:320e9a4f2bb3158b1bfb5a',
  measurementId: 'G-JXJ2NKYNBZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
