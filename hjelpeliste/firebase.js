// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnMXmPMWYGB-1Cyjf9fGxCSdv255ikkYc",
    authDomain: "learning-147.firebaseapp.com",
    projectId: "learning-147",
    storageBucket: "learning-147.appspot.com",
    messagingSenderId: "367100846840",
    appId: "1:367100846840:web:c5a31e9a78350dcd8b910d",
    measurementId: "G-CCRMJ16XJS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
