// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7D0j-2onvyoGrm6vwnERK9iUFmeiQLq8",
  authDomain: "slack-clone-835cb.firebaseapp.com",
  projectId: "slack-clone-835cb",
  storageBucket: "slack-clone-835cb.appspot.com",
  messagingSenderId: "139897062352",
  appId: "1:139897062352:web:816156f39ed6be3385afd5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };