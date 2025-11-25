import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey : "AIzaSyBrB10Qwjm6gtFOBOi8e2op04pJAPQX7-Y" ,
    authDomain : "api-store-17925.firebaseapp.com" ,
    projectId : "api-store-17925" ,
    storageBucket : "api-store-17925.firebasestorage.app" ,
    messagingSenderId : "215337900214" ,
    appId : "1:215337900214:web:6fd4b225177ceeed6b2e17"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
