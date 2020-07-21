import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD2URXTu-acDSsRGBFpEo8au5VoisKegAI",
    authDomain: "agilebeathunger.firebaseapp.com",
    databaseURL: "https://agilebeathunger.firebaseio.com",
    projectId: "agilebeathunger",
    storageBucket: "agilebeathunger.appspot.com",
    messagingSenderId: "733460063921",
    appId: "1:733460063921:web:56beadb9ef4894dfa7a490",
    measurementId: "G-EV8RQT4BJW"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;