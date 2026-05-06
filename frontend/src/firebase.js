import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDwWNNAqSMbGpz81mCg_vqWuC0F-EAvDnw",

  authDomain: "skillora-63621.firebaseapp.com",

  projectId: "skillora-63621",

  storageBucket: "skillora-63621.firebasestorage.app",

  messagingSenderId: "406306933605",

  appId: "1:406306933605:web:da01e2e0ca35b1b230af8c",

};

const app =
initializeApp(firebaseConfig);

export const auth =
getAuth(app);

export const provider =
new GoogleAuthProvider();