// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzSMgmjt9G_G-iDR8mUU86CHOqYdcm0pg",
  authDomain: "webmanza-74321.firebaseapp.com",
  projectId: "webmanza-74321",
  storageBucket: "webmanza-74321.appspot.com",
  messagingSenderId: "255952017328",
  appId: "1:255952017328:web:052c588d49ae7ae12ce875",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
