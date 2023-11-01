// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  getDocs,
  setDoc
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBstrVRaKMfPAKA1pVgRmxPbmROm2t5e3I',
  authDomain: 'cardiomyopathy-13e0e.firebaseapp.com',
  projectId: 'cardiomyopathy-13e0e',
  storageBucket: 'cardiomyopathy-13e0e.appspot.com',
  messagingSenderId: '282741354446',
  appId: '1:282741354446:web:76240d80ffb7384db3459f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuthentication = getAuth();
const firebaseFireStore = getFirestore();
const timestamp = serverTimestamp();

export {
  app,
  firebaseAuthentication,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  firebaseFireStore,
  timestamp,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  deleteDoc,
  getDocs,
  setDoc,
  getAuth
};
