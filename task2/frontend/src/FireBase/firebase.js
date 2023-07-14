import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig ={
    apiKey: "AIzaSyDiHBYK-4FFlDy5F7SDxqkoISLr-av6oZ8",
    authDomain: "auth-development-4bb9f.firebaseapp.com",
    projectId: "auth-development-4bb9f",
    storageBucket: "auth-development-4bb9f.appspot.com",
    messagingSenderId: "702855148400",
    appId: "1:702855148400:web:cfd71cf0a9a767a2d795b5"
  };

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
