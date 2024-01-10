// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAg9wWequjYR7WRIugB1245UvGa-js0Y5o",
    authDomain: "smoochy-5c423.firebaseapp.com",
    projectId: "smoochy-5c423",
    storageBucket: "smoochy-5c423.appspot.com",
    messagingSenderId: "413915686367",
    appId: "1:413915686367:web:c71abfeff5f018bc83d06a",
    measurementId: "G-2LSVHGGS2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;