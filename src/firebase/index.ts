import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCH6XS5A7qDjGDe0vOQrxp9bbUmZLULxTw",
  authDomain: "parka-1d2a1.firebaseapp.com",
  projectId: "parka-1d2a1",
  storageBucket: "parka-1d2a1.appspot.com",
  messagingSenderId: "909808375393",
  appId: "1:909808375393:web:b0b17b373bef568d54fc20",
  measurementId: "G-6PR2SY7NK2",
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

// export const auth = getAuth(firebaseApp);
// export const googleProvider = new GoogleAuthProvider();
