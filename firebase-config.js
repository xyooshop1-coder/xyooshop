// Replace with your Firebase project settings
 const firebaseConfig = {
    apiKey: "AIzaSyDQXDOxP_XSt8PWux2ipaKXQG_EzxE9W48",
    authDomain: "xyoo-shop.firebaseapp.com",
    projectId: "xyoo-shop",
    storageBucket: "xyoo-shop.firebasestorage.app",
    messagingSenderId: "671592025442",
    appId: "1:671592025442:web:41f8b45661090238b2b03b",
    measurementId: "G-NW28KNMRLS"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
