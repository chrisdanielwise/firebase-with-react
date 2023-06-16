// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcaC3pHWpA9zr7yv2meoUW8vnRe6V_1F8",
  authDomain: "my-firebase-store-tut.firebaseapp.com",
  projectId: "my-firebase-store-tut",
  storageBucket: "my-firebase-store-tut.appspot.com",
  messagingSenderId: "279812971632",
  appId: "1:279812971632:web:82f7a2b3a57b5e1b9068b5",
  measurementId: "G-PVM3YCF267"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)