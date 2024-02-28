// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCXyzWCM3BABH-1_-5yhSHarkpvclqLDzY',
    authDomain: 'timtronhanh-ebce7.firebaseapp.com',
    projectId: 'timtronhanh-ebce7',
    storageBucket: 'timtronhanh-ebce7.appspot.com',
    messagingSenderId: '972117697690',
    appId: '1:972117697690:web:a5363ecb5af56b5d51eb23',
    measurementId: 'G-0J5FY64MR8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
