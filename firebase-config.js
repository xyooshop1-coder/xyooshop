// Replace with your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyDQXDOxP_XSt8PWux2ipaKXQG_EzxE9W48",
  authDomain: "xyoo-shop.firebaseapp.com",
  projectId: "xyoo-shop",
  storageBucket: "xyoo-shop.firebasestorage.app",
  messagingSenderId: "671592025442",
  appId: "1:671592025442:web:a5ce853dd6426affb2b03b",
  measurementId: "G-S4PVBV4KQS"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
