// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNg4iowN0vaGUOQm8wOJnmqWswrVqzEuc",
    authDomain: "blokkd.firebaseapp.com",
    projectId: "blokkd",
    storageBucket: "blokkd.appspot.com",
    messagingSenderId: "777073264345",
    appId: "1:777073264345:web:b764cac5bd8c66f4d6a0c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
