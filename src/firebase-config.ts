import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBeDVE9CMHuWXnzHPllVCCdaHzjbVdEhWQ",
    authDomain: "new-total.firebaseapp.com",
    projectId: "new-total",
    storageBucket: "new-total.appspot.com",
    messagingSenderId: "86445044871",
    appId: "1:86445044871:web:00e62a43ccfdad59a07422",
    measurementId: "G-QNRMQDJBZV"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 