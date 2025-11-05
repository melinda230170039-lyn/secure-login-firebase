// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDvdAT291E4ibY_mC2iRgul8G_p-pW0Ddo",
  authDomain: "login-039.firebaseapp.com",
  projectId: "login-039",
  storageBucket: "login-039.firebasestorage.app",
  messagingSenderId: "183422607546",
  appId: "1:183422607546:web:2253b27dcbdbf1ab3e6283"
};
// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
// Inisialisasi Firestore
const db = firebase.firestore();

console.log(" Firebase & Frestore connected successfully!");