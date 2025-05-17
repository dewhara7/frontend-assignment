import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

//  Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrWgHtAj5sik2Ap-DFUdY1cGsUosKvt0g",
    authDomain: "exelk-erp.firebaseapp.com",
    projectId: "exelk-erp",
    storageBucket: "exelk-erp.appspot.com",
    messagingSenderId: "806104452555",
    appId: "1:806104452555:web:e84caf2cdcb6c25eb77a4e",
    measurementId: "G-HR4SJ9VSD7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 