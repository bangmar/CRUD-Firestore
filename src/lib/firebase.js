import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDY-rmpyQEc4JpZEcHdLh_7NkpxlBvae2E",
	authDomain: "test-b788f.firebaseapp.com",
	projectId: "test-b788f",
	storageBucket: "test-b788f.appspot.com",
	messagingSenderId: "622629927923",
	appId: "1:622629927923:web:f9bb9454b954c6623cb086",
	measurementId: "G-C87PGLYNX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
