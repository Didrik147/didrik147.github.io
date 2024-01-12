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

const moldSelectEl = document.querySelector('#moldselect')
const putterInputEl = document.querySelector("#putterinput")
const fromInputEl = document.querySelector("#frominput")
const toInputEl = document.querySelector("#toinput")
const inputEls = document.querySelectorAll("input")
const usernameEl = document.querySelector("#username")

const startBtn = document.querySelector("#start")
const submitBtn = document.querySelector("#submit")

const bodyEl = document.querySelector('body')

let distance_from;
let distance_to;
let nPutters;
let C1X_percentage;

let moldArr = []

for (let i = 0; i < moldSelectEl.children.length; i++) {
  moldArr.push(moldSelectEl.children[i].value)
  if (moldSelectEl.children[i].value == localStorage.mold) {
    moldSelectEl.children[i].selected = true
  }
}

let putterName = moldSelectEl.value

if (localStorage.putters) {
  putterInputEl.placeholder = localStorage.putters
}

if (localStorage.fromDistance) {
  fromInputEl.placeholder = localStorage.fromDistance
}

if (localStorage.toDistance) {
  toInputEl.placeholder = localStorage.toDistance
}

if (localStorage.username) {
  usernameEl.value = localStorage.username
}


moldSelectEl.addEventListener('change', updateMoldLS)
putterInputEl.addEventListener('input', updatePuttersLS)
fromInputEl.addEventListener('input', updateFromDistanceLS)
toInputEl.addEventListener('input', updateToDistanceLS)

function updateMoldLS() {
  console.log("Updating mold in local storage")
  localStorage.mold = moldSelectEl.value
}

function updatePuttersLS() {
  console.log("Updating number of putters in local storage")
  localStorage.putters = putterInputEl.value
}

function updateFromDistanceLS() {
  console.log("Updating distance in local storage")
  localStorage.fromDistance = fromInputEl.value
}

function updateToDistanceLS() {
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
let collectionName;

//let distanceArr = ['4m', '5m', '6m', '7m', '8m', '9m']


/* Starting the putting practice */
startBtn.addEventListener("click", startPractice)


async function startPractice() {
  // Get putter name
  putterName = moldSelectEl.value
  localStorage.username = usernameEl.value
  collectionName = localStorage.username
  //collectionName = 'new_test'


  // Remove background
  bodyEl.style.background = 'none'
  headerEl.style.margin = '0px'

  //console.log(`Putter: ${putterName}`)


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


submitBtn.addEventListener('click', submitData)


function submitData() {

  let C1X_made = 0
  let C1X_tried = 0

  let dataObj = { "name": putterName }


  for (let d = distance_from; d <= distance_to; d++) {
    let nSuccess = -1
    const buttonsInRow = document.querySelectorAll(`.row${d} > button`)
    buttonsInRow.forEach(buttonEl => {
      if (buttonEl.classList.contains('clicked')) {
        nSuccess = Number(buttonEl.innerHTML)
      }
    })
    if (nSuccess >= 0) {
      dataObj[`${d}m`] = [nSuccess, nPutters]

      if (d > 3.3 && d < 10) {
        C1X_made += nSuccess
        C1X_tried += nPutters
      }
      console.log(`${d} m: ${nSuccess}/${nPutters}`)
    }
  }

  if (Object.keys(dataObj).length > 1) {
    console.log('Logging results')
    console.log(dataObj)

    updateDB(dataObj)

    C1X_percentage = 100 * (C1X_made / C1X_tried)
    C1X_percentage = Math.round(C1X_percentage * 10) / 10


    headerEl.innerHTML = `<h1>Putter: ${putterName}</h1>`
    mainEl.innerHTML = '<h2 class="center">Data sent</h2>'
    mainEl.innerHTML += `<h3 class="center">C1X percentage: ${C1X_percentage} %</h3>`

    drawPieChart(C1X_percentage)

    mainEl.innerHTML += `<br>`

    submitBtn.classList.toggle('hide')
    /* footerEl.innerHTML = '<button onclick="location.reload()">Try again?</button>' */

    //console.log(data)
  } else {
    alert('No data to be stored')
  }
}


async function updateDB(data) {
  console.log("Updating database")

  let timestamp = new Date().getTime().toString()
  console.log("Timestamp:", timestamp)

  // Add a new document with a specified ID
  await setDoc(doc(db, collectionName, timestamp), data)
}


// Function to manually add data
async function addManualData() {
  let choice = prompt('Add manual data? (y/n):')

  if (choice == 'y') {


    console.log("Manually adding data")
    let collectionName = "Didrik147"

    let data = {
      "name": "Reko",
      '4m': [19, 20],
      '5m': [17, 20],
      '6m': [14, 20],
      '7m': [12, 20],
      '8m': [2, 12],
      '9m': [0, 0]
    }

    let timestamp = new Date().getTime().toString()
    console.log("Timestamp:", timestamp)

    // Add a new document with a specified ID
    await setDoc(doc(db, collectionName, timestamp), data)
  }
}

//addManualData()


// Function for drawing pie chart
function drawPieChart(p) {
  document.querySelector('.chart-container').classList.remove('hide')

  let ctx = document.getElementById('pieChart').getContext('2d');

  let pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: [p, 100 - p],
        backgroundColor: ['#43AA8B', '#FB3640']
      }],
      labels: ['Putt made', 'Putts missed']
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
          fontSize: 18,

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