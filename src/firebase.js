// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "",
	authDomain: "endorsements-aa2b6.firebaseapp.com",
	projectId: "endorsements-aa2b6",
	storageBucket: "endorsements-aa2b6.appspot.com",
	messagingSenderId: "227298825249",
	appId: "1:227298825249:web:86967bff4e9e9165a73f60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const endorsementCollection = collection(db, "endorsements");
