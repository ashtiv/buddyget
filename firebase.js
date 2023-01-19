import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKu2bhxYBrr6GtJGoK7Oq4AjA7DtmY0c8",
    authDomain: "buddyget-79579.firebaseapp.com",
    projectId: "buddyget-79579",
    storageBucket: "buddyget-79579.appspot.com",
    messagingSenderId: "454714096775",
    appId: "1:454714096775:web:4b747b91009d9af6568c22",
    measurementId: "G-QNMZP9XKGQ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };