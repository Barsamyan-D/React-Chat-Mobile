import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4f8CJxEUzI2vyfX8T-TY8sAeZAQM4BCw",
  authDomain: "chat-code-4658f.firebaseapp.com",
  projectId: "chat-code-4658f",
  storageBucket: "chat-code-4658f.appspot.com",
  messagingSenderId: "741250482242",
  appId: "1:741250482242:web:f856bb88ef7d946c82addb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);