import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAH9XONxkgbRLS4_rXfsGeYqDE4ibfYg0Q",
  authDomain: "pawcare-app-2026.firebaseapp.com",
  projectId: "pawcare-app-2026",
  storageBucket: "pawcare-app-2026.firebasestorage.app",
  messagingSenderId: "187713861534",
  appId: "1:187713861534:web:a1fb286484f61e6ce3488f",
  measurementId: "G-4SSXH7GYGC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
