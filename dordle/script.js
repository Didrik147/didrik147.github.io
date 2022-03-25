/* Inspirert av 'Wordle' fra New York Times
https://www.nytimes.com/games/wordle/index.html
*/

// Naturfagsbegreper på 5 bokstaver
let begreperNaturfag = [
    "klima",
    "tymin",
    "radon",
    "bryte",
    "arver",
    "gener",
    "enzym",
    "fakta",
    "argon",
    "titan",
    "arsen",
    "selen",
    "xenon",
    "klone",
    "Locus",
    "polar",
    "fluor",
    "astat",
];

// Mulige ord (naturfag)
let muligeOrd = begreperNaturfag


// Henter elementer fra DOM
let inputEl = document.querySelector('#textinput')
let hovedEl = document.querySelector('#hoved')
//let bodyEl = document.querySelector('body')
let reglerEl = document.querySelector('#regler')


// Starter å telle fra 1. januar 2022
const offsetFromDate = new Date(2022, 0, 1)

// Antall ms siden valgte dato
const msOffset = Date.now() - offsetFromDate

// Gjør om fra ms til dager
const dayOffset = msOffset / 1000 / 60 / 60 / 24
//console.log(dayOffset)

// Det korrekte ordet (fasit)
let fasit = muligeOrd[Math.floor(dayOffset) % muligeOrd.length]
//let fasit = "LEKSE"
fasit = fasit.toUpperCase()
//console.log(fasit)


// Lengde på ordet (antall bokser i hver rad)
let nLetters = fasit.length

// Vanskelighetsgrad (antall rader)
let nRows = 6

// Lager rader med bokser i hver rad
for(let i=0; i<nRows; i++){
    for(let j=0; j<nLetters; j++){
        hovedEl.innerHTML += `<div class="rad${i+1}"></div>`
    }
}



// Legger til en lytter som fyrer av når innholdet i input feltet endres
inputEl.addEventListener('input', skrivOrd)


// Starter med rad nr. 1
let radNr = 1;

let vant = false

// Fyller inn ord i boksene
function skrivOrd(){
    let svar = inputEl.value
    svar = svar.toUpperCase()

    // Henter en rad
    let radEl = document.querySelectorAll(`.rad${radNr}`)

    // Tømmer alle div i raden
    for(let i=0; i<radEl.length; i++){
        radEl[i].innerText = ""
    }

    for(let i=0; i<svar.length; i++){
        radEl[i].innerText = svar[i]
    }
}

// Lytter etter 'Enter' når man har fylt ut alle boksene
inputEl.addEventListener('keydown', sjekk)

function sjekk(e){
    if(e.key == "Enter" && this.value.length == nLetters){
        console.log("Sjekker rad")
        sjekkRad(this.value.toUpperCase(), radNr)

        // Øker radnr
        radNr++

        // Tømmer input feltet
        this.value = ""

        if (radNr > nRows && !vant){
            console.log("Du tapte")
            inputEl.classList.toggle('hide')
            reglerEl.innerHTML += `<h1>Du tapte...</h1>`
            reglerEl.innerHTML += `<h2>Ordet var: ${fasit}</h2>`
        }
    }
}



function sjekkRad(svar, radNr){
    // Initialiserer antall rett
    let antRett = 0

    // Henter rad fra DOM
    let radEl = document.querySelectorAll(`.rad${radNr}`)

    // Gjør alle bokser grå
    for(let i=0; i<nLetters; i++){
        radEl[i].classList.add("grayBox")
    }

    // Sjekket om rett bokstav, men annen plass (blir gul)
    for(let i=0; i<nLetters; i++){
        for(let j=0; j<nLetters; j++){
            if (i != j){
                if(svar[i]==fasit[j]){
                    radEl[i].classList.add("yellowBox")
                }
            }
        }
    }
    
    // Sjekker om rett bokstav på rett plass (blir grønn)
    for(i=0; i<nLetters; i++){
        if(svar[i]==fasit[i]){
            radEl[i].classList.add("greenBox")
            antRett++
        }
    }

    // Hvor mange rett
    console.log(antRett)

    if(antRett == nLetters){
        console.log("Du vant!")
        vant = true
        inputEl.classList.toggle('hide')
        reglerEl.innerHTML += `<h1>Du vant!</h1>`
    }
}