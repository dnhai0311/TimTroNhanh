// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCvLg0nKH3NzpJdg6jFNrs_7hPjOH7_WC4',
    authDomain: 'timtronhanh-83a8d.firebaseapp.com',
    projectId: 'timtronhanh-83a8d',
    storageBucket: 'timtronhanh-83a8d.appspot.com',
    messagingSenderId: '76131318275',
    appId: '1:76131318275:web:141ccb068151b6ce9fec36',
    measurementId: 'G-HZ73Z0BHS4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
