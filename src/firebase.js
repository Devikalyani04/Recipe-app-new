
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqAZUDuLP7GpVfT3D9Yry9B5EuBhNLvAE",
  authDomain: "recipe-project-b02e7.firebaseapp.com",
  projectId: "recipe-project-b02e7",
  storageBucket: "recipe-project-b02e7.firebasestorage.app",
  messagingSenderId: "795087362373",
  appId: "1:795087362373:web:f439d333118cc4b976c62c",
  measurementId: "G-272MEV6ZNH"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(); 
