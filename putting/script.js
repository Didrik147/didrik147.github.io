/* Program is currently only working for 4-9 meters */


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


// Get elements from DOM
const mainEl = document.querySelector("main")
const headerEl = document.querySelector("header")
const footerEl = document.querySelector("footer")

const selectEl = document.querySelector('#moldselect')
const putterInputEl = document.querySelector("#putterinput")
const fromInputEl = document.querySelector("#frominput")
const toInputEl = document.querySelector("#toinput")
const inputEls = document.querySelectorAll("input")

const startBtn = document.querySelector("#start")
const submitBtn = document.querySelector("#submit")

let distance_from;
let distance_to;
let nPutters;
let C1X_percentage;

let moldArr = []

for(let i=0; i<selectEl.children.length; i++){
    moldArr.push(selectEl.children[i].value)
    if (selectEl.children[i].value == localStorage.mold){
        selectEl.children[i].selected = true
    }
}

let putterName = selectEl.value

if(localStorage.putters){
    putterInputEl.placeholder = localStorage.putters
}

if(localStorage.fromDistance){
    fromInputEl.placeholder = localStorage.fromDistance
}

if(localStorage.toDistance){
    toInputEl.placeholder = localStorage.toDistance
}


selectEl.addEventListener('change', updateMoldLS)
putterInputEl.addEventListener('input', updatePuttersLS)
fromInputEl.addEventListener('input', updateFromDistanceLS)
toInputEl.addEventListener('input', updateToDistanceLS)

function updateMoldLS(){
    console.log("Updating mold in local storage")
    localStorage.mold = selectEl.value
}

function updatePuttersLS(){
    console.log("Updating number of putters in local storage")
    localStorage.putters = putterInputEl.value
}

function updateFromDistanceLS(){
    console.log("Updating distance in local storage")
    localStorage.fromDistance = fromInputEl.value
}

function updateToDistanceLS(){
    console.log("Updating distance in local storage")
    localStorage.toDistance = toInputEl.value
}




function updateMain() {
    //console.log("Updating HTML") 
    mainEl.innerHTML = ""
    if (fromInputEl.value == '') {
        distance_from = Number(fromInputEl.placeholder)
    } else {
        distance_from = Number(fromInputEl.value)
    }

    if (toInputEl.value == '') {
        distance_to = Number(toInputEl.placeholder)
    } else {
        distance_to = Number(toInputEl.value)
    }



    for (let d = distance_from; d <= distance_to; d++) {
        mainEl.innerHTML += `
        <article>
            <h2>${d} meter</h2>
            <div class="buttonrow row${d}">
            </div>
        </article>
    `
        const buttonrowEl = document.querySelector(`.row${d}`)
        if (putterInputEl.value == '') {
            nPutters = Number(putterInputEl.placeholder)
        } else {
            nPutters = Number(putterInputEl.value)
        }

        for (let i = 0; i <= nPutters; i++) {
            buttonrowEl.innerHTML += `
            <button>${i}</button>
        `
        }

        let gap = 30 / (nPutters * 2)
        buttonrowEl.style.gap = `${gap}%`


        updateButtons()
    }
}

function updateButtons() {
    const buttonEls = document.querySelectorAll("main button")

    buttonEls.forEach(buttonEl => {
        buttonEl.addEventListener("click", clickButton)
    })

    /* Making it similar to radio button */
    function clickButton(e) {
        if (e.target.classList.contains("clicked")) {
            e.target.classList.remove("clicked")
        } else {
            let row = e.target.parentElement.classList[1]

            const buttonsInRow = document.querySelectorAll(`.${row} > button`)

            buttonsInRow.forEach(buttonEl => {
                buttonEl.classList.remove("clicked")
            })
            e.target.classList.add("clicked")
        }
    }
}

/* Database */
let collectionName = 'putting'

let oldData = {}

let distanceArr = ['4m', '5m', '6m', '7m', '8m', '9m']

/* Resetting data for all molds (CAREFUL) */
/* moldArr.forEach(mold => {
    resetMoldData(mold)
}) */


/* Starting the putting practice */
startBtn.addEventListener("click", startPractice)

async function startPractice() {
    // Get putter name
    putterName = selectEl.value
    //console.log(putterName)

    // Get previous data from database
    await getPutterData(putterName)  

    // Remove background
    document.querySelector('body').style.background='none'
    headerEl.style.margin='0px'

    console.log(`Data before this putting practice (made/tried)`)
    console.log(`Putter: ${putterName}`)

    distanceArr.forEach(d => {
        console.log(`${d}: ${oldData[d][0]}/${oldData[d][1]}`)
    })


    headerEl.innerHTML = `
    <h1>Putter: ${putterName}</h1>
    <p>For each distance, press the button that corresponds to the number of putters that went in. You can skip a distance by leaving it blank.</p>
    `

    // Play sound
    //document.getElementById('pottis').play();

    updateMain()
    startBtn.classList.toggle('hide')
    submitBtn.classList.toggle('hide')
}


async function getPutterData(putterName) {
    // Get discs from database
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data())

        if (doc.id == putterName){
            let disc = doc.data()
            distanceArr.forEach(dist => {
                oldData[dist] = disc[dist]
            })
            
        }
    })
}

async function resetMoldData(mold){
    console.log("Adding disc to database")

    // Add a new document with a specified ID
    await setDoc(doc(db, collectionName, mold), {
        name: mold,
        '4m': [0, 0],
        '5m': [0, 0],
        '6m': [0, 0],
        '7m': [0, 0],
        '8m': [0, 0],
        '9m': [0, 0]
    })
}




async function updatePutter(newData) {
    console.log("Updating database")

    // Add a new document with a specified ID
    await setDoc(doc(db, collectionName, putterName), {
        name: putterName,
        '4m': newData['4m'], 
        '5m': newData['5m'], 
        '6m': newData['6m'], 
        '7m': newData['7m'], 
        '8m': newData['8m'], 
        '9m': newData['9m'], 
    })

}

let addData = {
    '4m' : [0, 0],
    '5m' : [0, 0],
    '6m' : [0, 0],
    '7m' : [0, 0],
    '8m' : [0, 0],
    '9m' : [0, 0],
}

let newData = addData

submitBtn.addEventListener('click', submitData)

function submitData() {
    console.log('Logging results')

    let C1X_made = 0
    let C1X_tried = 0

    
    for (let d = distance_from; d <= distance_to; d++) {
        let nSuccess = -1
        const buttonsInRow = document.querySelectorAll(`.row${d} > button`)
        buttonsInRow.forEach(buttonEl => {
            if (buttonEl.classList.contains('clicked')) {
                nSuccess = Number(buttonEl.innerHTML)
            }
        })
        if (nSuccess >= 0) {
            addData[`${d}m`] = [nSuccess, nPutters]

            if (d > 3.3 && d < 10) {
                C1X_made += nSuccess
                C1X_tried += nPutters
            }
            console.log(`${d} m: ${nSuccess}/${nPutters}`)
        }
    }

    distanceArr.forEach(dist => {
        newData[dist] = [
            oldData[dist][0] + addData[dist][0],
            oldData[dist][1] + addData[dist][1],
        ]
    })

    updatePutter(newData)

    C1X_percentage = 100 * (C1X_made / C1X_tried)
    C1X_percentage = Math.round(C1X_percentage * 10) / 10

    
    headerEl.innerHTML = `<h1>Putter: ${putterName}</h1>`
    mainEl.innerHTML = '<h2 class="center">Data sent</h2>'
    mainEl.innerHTML += `<h3 class="center">C1X percentage: ${C1X_percentage} %</h3>`

    drawChart(C1X_percentage)

    mainEl.innerHTML += `<br>`

    footerEl.innerHTML = '<button onclick="location.reload()">Try again?</button>'

    //console.log(data)
}



// Function for drawing pie chart
function drawChart(p) {
    document.querySelector('.chart-container').classList.remove('hide')

    let ctx = document.getElementById('myChart').getContext('2d');
    let labels = ['Putt made', 'Putts missed']
    let colorHex = ['#43AA8B', '#FB3640']

    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [p, 100-p],
                backgroundColor: colorHex
            }],
            labels: labels
        },
        options: {
            responsive: true,
            /* rotation: 45, */
            legend: {
                position: 'bottom',
                onClick: null,
                reverse: true,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: 'percentage',

                    // identifies whether or not labels of value 0 are displayed, default is false
                    showZero: true,

                    // font size, default is defaultFontSize
                    fontSize: 20,

                    // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                    fontColor: '#fff',

                    // draw text shadows under labels, default is false
                    textShadow: true,

                    // text shadow intensity, default is 6
                    shadowBlur: 10,

                    // text shadow X offset, default is 3
                    shadowOffsetX: 0,

                    // text shadow Y offset, default is 3
                    shadowOffsetY: 0,

                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: 'rgba(0,0,0,1)',
                }
            }
        }
    })
}