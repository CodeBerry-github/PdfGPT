import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBw1qp8PgmwI_YWBMMSvsiaQaR09_z8rik",
  authDomain: "pdfgpt-1d946.firebaseapp.com",
  projectId: "pdfgpt-1d946",
  storageBucket: "pdfgpt-1d946.appspot.com",
  messagingSenderId: "651260055434",
  appId: "1:651260055434:web:25810f83a38efa53f94273",
  measurementId: "G-SXBQLCG73E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;