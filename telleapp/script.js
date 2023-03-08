// Henter elementer fra DOM
let decreaseEl = document.querySelector(".decrease")
let increaseEl = document.querySelector(".increase")

let topEl = document.querySelector(".top")


// Dersom egenskapen telle i localStorage ikke er satt, skal den settes til verdien 0
if(!localStorage.telle){
    localStorage.telle = 0
}

// Skriver innholdet i count fra localStorage til top-elementet
topEl.innerText = localStorage.telle


// Legger til lyttere til senking og økning av tallet
decreaseEl.addEventListener("click", decreaseNumber)
increaseEl.addEventListener("click", increaseNumber)

// Funksjon som minker telleren
function decreaseNumber(){
    // Må gjøre om til Number, siden det er lagret som string
    localStorage.telle = Number(localStorage.telle) - 1
    topEl.innerText = localStorage.telle
}

// Funksjon som øker telleren
function increaseNumber(){
    localStorage.telle = Number(localStorage.telle) + 1
    topEl.innerText = localStorage.telle
}

// Knapp som nullstiller
let resetBtn = document.querySelector('#reset')

resetBtn.addEventListener('click', resetNumber)

function resetNumber(){
    localStorage.telle = 0
    topEl.innerText = localStorage.telle
}