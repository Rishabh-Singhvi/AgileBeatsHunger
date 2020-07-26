import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBgjV2ZyEN75pb0VqHMp18--BvCsjayL14",
  authDomain: "agile-25afd.firebaseapp.com",
  databaseURL: "https://agile-25afd.firebaseio.com",
  projectId: "agile-25afd",
  storageBucket: "agile-25afd.appspot.com",
  messagingSenderId: "121300202546",
  appId: "1:121300202546:web:774ce9f4e0ff794927782b",
  measurementId: "G-T867Z67Z0B"
};
  
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;