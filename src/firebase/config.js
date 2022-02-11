import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD459SzdAdlyD9XTVBc9ZznW7XeadlTmYI",
    authDomain: "morning-music-e51f6.firebaseapp.com",
    projectId: "morning-music-e51f6",
    storageBucket: "morning-music-e51f6.appspot.com",
    messagingSenderId: "1075011639710",
    appId: "1:1075011639710:web:4394fbbd1d4e63816d5e8f"
  };

// init app
firebase.initializeApp(firebaseConfig)

//  init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }



