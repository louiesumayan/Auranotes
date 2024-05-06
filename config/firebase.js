// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDmaBR_xwTD2VxmQCPjrQi-ltFLa5HRHTA',
  authDomain: 'auranotesdb.firebaseapp.com',
  projectId: 'auranotesdb',
  storageBucket: 'auranotesdb.appspot.com',
  messagingSenderId: '75691379408',
  appId: '1:75691379408:web:fa113eebf01a4148406cd5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
