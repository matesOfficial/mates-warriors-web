
import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_3Hof53Y7fMsm1B_ZfLKQAXs8vp2uWfk",
    authDomain: "covid-app-33605.firebaseapp.com",
    projectId: "covid-app-33605",
    storageBucket: "covid-app-33605.appspot.com",
    messagingSenderId: "348940889673",
    appId: "1:348940889673:web:43bb76a8ab12fc7f419998",
    measurementId: "G-WQJXB603Y2"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();   //to access firebase database
  const auth=firebase.auth();     
  
  export {db,auth};



  //------------------------------------------------------------simar's code

// import firebase from 'firebase/app'
// import "firebase/auth"


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MEASSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// const app = firebase.initializeApp(firebaseConfig);
// const db=firebaseApp.firestore();   //to access firebase database


// export const auth = app.auth();
// export{db}
// export default app;