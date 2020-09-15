var firebaseConfig = {
  apiKey: "AIzaSyAyoOgDs2n1Pz6q15hEtQAKoX8-xP-BMnM",
  authDomain: "discotech.firebaseapp.com",
  databaseURL: "https://discotech.firebaseio.com",
  projectId: "discotech",
  storageBucket: "discotech.appspot.com",
  messagingSenderId: "300555706540",
  appId: "1:300555706540:web:f54ebdb556d6c79632ff09",
  measurementId: "G-YYBCWLVVQC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();