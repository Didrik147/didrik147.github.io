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

// Elements from DOM
const userEl = document.querySelector('#user')
const mainEl = document.querySelector('main')
const tableContainerEl = document.querySelector('#table-container')
const c1xEl = document.querySelector('#c1x')
const bodyEl = document.querySelector('body')

let username = userEl.value

let distances = ["4m", "5m", "6m", "7m", "8m", "9m"]

let C1X_data = {
    '4m': [0, 0],
    '5m': [0, 0],
    '6m': [0, 0],
    '7m': [0, 0],
    '8m': [0, 0],
    '9m': [0, 0],
}



userEl.addEventListener('change', (e) => {
    username = e.target.value
    /* if (username.length > 0) {
        getUserData(username)
    } */
    getUser(username)
})

async function getUser(username) {
    // Get information about user from database
    const q = query(collection(db, username))
    const querySnapshot = await getDocs(q)

    let discs = []

    if (querySnapshot.size == 0) {
        console.log("User has no data")
    } else {
        querySnapshot.forEach((doc) => {
            discs.push(doc.data())
        })
    }
    getData(discs)
}


getUser(username)

function getData(discs) {
    C1X_data = {
        '4m': [0, 0],
        '5m': [0, 0],
        '6m': [0, 0],
        '7m': [0, 0],
        '8m': [0, 0],
        '9m': [0, 0],
    }
    
    tableContainerEl.innerHTML = `<h2 class="center">Data</h2>`

    // Lager et tabellelement
    let tableEl = document.createElement('table')

    // Lager thead
    let theadEl = document.createElement('thead')

    // Lager tr for thead
    let trEl = document.createElement('tr')

    let headerArr = ["Mold", "4 m", "5 m", "6 m", "7 m", "8 m", "9 m", "C1X"]

    headerArr.forEach(head => {
        let thEl = document.createElement('th')
        thEl.innerText = head
        trEl.appendChild(thEl)
    })

    // Legger raden til thead
    theadEl.appendChild(trEl)

    // Legger thead til table
    tableEl.appendChild(theadEl)

    // Lager tbody element
    let tbodyEl = document.createElement('tbody')

    let madeTotal = 0
    let triedTotal = 0

    // Går gjennom alle objektene i arrayet
    // Dette er alle de ulike putterne
    discs.forEach(disc => {
        let trEl = document.createElement('tr')

        // Navnet på discen
        let tdEl = document.createElement('td')
        tdEl.innerHTML = disc.name

        // Legger kolonnen til raden
        trEl.appendChild(tdEl)

        let made = 0
        let tried = 0

        // Lager kolonner
        // Går gjennom alle distansene
        distances.forEach(distance => {
            // Putting stats
            tdEl = document.createElement('td')
            tdEl.innerHTML = `${disc[distance][0]} / ${disc[distance][1]}`

            made += disc[distance][0]
            tried += disc[distance][1]

            // Legger kolonnen til raden
            trEl.appendChild(tdEl)

            C1X_data[distance][0] += disc[distance][0]
            C1X_data[distance][1] += disc[distance][1]
        })

        let C1X_percentage = (made / tried) * 100
        C1X_percentage = Math.round(C1X_percentage)

        // Siste kolonne (C1X percentage)
        tdEl = document.createElement('td')
        tdEl.innerHTML = `${C1X_percentage} %`
        trEl.appendChild(tdEl)

        // Legger raden til tbody hvis den ikke er helt tom
        if (!isNaN(C1X_percentage)) {
            tbodyEl.appendChild(trEl)
        }

        madeTotal += made
        triedTotal += tried
    })

    let C1X_percentage_total = (madeTotal / triedTotal) * 100
    console.log(C1X_percentage_total)

    C1X_percentage_total = Math.round(C1X_percentage_total)

    // Legger tbody til tabellen
    tableEl.appendChild(tbodyEl)

    // Legger tabellen til div med id hoved
    tableContainerEl.appendChild(tableEl)

    c1xEl.innerHTML = ''
    c1xEl.innerHTML += `<h3 class='center'>Total C1X percentage: <br>${C1X_percentage_total} %</h3>`

    //console.log(C1X_data)
    drawBarChart(makeData(C1X_data))
}



function makeData(dataObj) {
    let dataArr = []
    distances.forEach(distance => {
        dataArr.push(100 * (dataObj[distance][0] / dataObj[distance][1]))
    })

    return dataArr
}

const canvasEl = document.querySelector('canvas')
let ctx = canvasEl.getContext('2d');

let barChart = new Chart(ctx)

// Function for drawing bar chart
function drawBarChart(dataArr) {   
    barChart.destroy();
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["4 m", "5 m", "6 m", "7 m", "8 m", "9 m"],
            datasets: [{
                label: 'Putting percentage',
                data: dataArr,
            }]
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    })
}

//let dataArr = [95, 80, 70, 60, 40, 10]
