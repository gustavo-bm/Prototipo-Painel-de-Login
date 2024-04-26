// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQn1qiH_AWm0rmqmcWKZhoELwrliLJy8M",
  authDomain: "painel-de-login-c0be2.firebaseapp.com",
  projectId: "painel-de-login-c0be2",
  storageBucket: "painel-de-login-c0be2.appspot.com",
  messagingSenderId: "787690286028",
  appId: "1:787690286028:web:f66ef2eebb01ce30434b69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
