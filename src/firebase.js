import firebase from 'firebase'

import "firebase/auth"

console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MEASSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);

export const convertDate = (d) => {
    if (!d) return null;
    return firebase.firestore.Timestamp.fromDate(new Date(d));
}

export const db = app.firestore();
export const storage = app.storage();
export const auth = app.auth();

export default app;