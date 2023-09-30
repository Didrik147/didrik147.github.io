/* Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrjzn3bcOod4roVQGcbzyOMC3VQmIdxP8",
    authDomain: "hobbies-147.firebaseapp.com",
    projectId: "hobbies-147",
    storageBucket: "hobbies-147.appspot.com",
    messagingSenderId: "751737489182",
    appId: "1:751737489182:web:e2a011e600b257ce8deb0f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// Cloud Firestore Database
//import { getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, query } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import { getFirestore, getDocs, collection, query, doc, setDoc, addDoc, deleteDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const db = getFirestore(app);

const userEl = document.querySelector('#user')
let username;

userEl.addEventListener('change', (e) => {
    username = e.target.value
    if (username.length > 0) {
        getUserData(username)
    }
})

async function getUserData(username) {
    // Get information about user from database
    const q = query(collection(db, username))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        console.log(doc)
    })
}
