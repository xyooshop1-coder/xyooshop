// Replace with your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyDQXDOxP_XSt8PWux2ipaKXQG_EzxE9W48",
  authDomain: "xyoo-gag-store.firebaseapp.com",
  projectId: "xyoo-gag-store",
  storageBucket: "xyoo-gag-store.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
