
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Replace these values with your Firebase config from your Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCsqJ0goAIc3BMEDLnJxcThE6CmPJAj-xQ",
    authDomain: "homie-lifts.firebaseapp.com",
    projectId: "homie-lifts",
    storageBucket: "homie-lifts.firebasestorage.app",
    messagingSenderId: "471619425579",
    appId: "1:471619425579:web:68388d8aa8acf1cd46616e",
    measurementId: "G-K3Y82V6ERP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
