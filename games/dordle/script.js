/* Inspirert av 'Wordle' fra New York Times
https://www.nytimes.com/games/wordle/index.html
*/


// Naturfagsbegreper på 5 bokstaver
let begreperNaturfag = [
    "astat",
    "alkan",
    "alken",
    "alkyn",
    "arver",
    "argon",
    "arsen",
    "amino",
    "anode",
    "bryte",
    "butan",
    "bærer",
    "bølge",
    "celle",
    "enzym",
    "farge",
    "fakta",
    "fluor",
    "gamma",
    "gener",
    "ioner",
    "kjemi",
    "klima",
    "klone",
    "locus",
    "masse",
    "metan",
    "miljø",
    "oktan",
    "polar",
    "potet",
    "radon",
    "speil",
    "stoff",
    "selen",
    "tesla",
    "tymin",
    "titan",
    "teori",
    "væske",
    "xenon",
];

//console.log("Antall naturfagsbegreper:", begreperNaturfag.length)

// Begreper innen matematikk på 5 bokstaver
let begreperMatematikk = [
    "anbud",
    "areal",
    "bayes",
    "bevis",
    "doble",
    "euler",
    "katet",
    "kurve",
    "korde",
    "løkke",
    "linje",
    "minus",
    "origo",
    "pluss",
    "punkt",
    "prøve",
    "rekke",
    "reell",
    "skatt",
    "snitt",
    "sfære",
    "tiere",
    "torus",
    "tusen",
    "teori",
    "union",
    "uekte",
    "vekst",
    "verdi",
];

//console.log("Antall begreper innen matematikk:", begreperMatematikk.length)

// Begreper innen programmering på 5 bokstaver
let begreperProg = [
    "løkke",
    "while",
    "input",
    "liste",
    "array",
    "float",
    "print",
];

// Begreper innen IT på 5 bokstaver
let begreperIT = [
    "HTTPS",
    "width",
    "image",
    "bilde",
    "color",
    "farge",
    "style",
    "filer",
];


// Henter elementer fra DOM
let inputEl = document.querySelector('#textinput')
let hovedEl = document.querySelector('#hoved')
//let bodyEl = document.querySelector('body')
let reglerEl = document.querySelector('#regler')
let meldingEl = document.querySelector('#melding')


// Starter å telle fra 1. januar 2022
const offsetFromDate = new Date(2022, 0, 1)

// Antall ms siden valgte dato
const msOffset = Date.now() - offsetFromDate

// Gjør om fra ms til dager
const dayOffset = msOffset / 1000 / 60 / 60 / 24
//console.log(dayOffset)



//let = begreper = [begreperNaturfag, begreperMatematikk, begreperIT, begreperProg]
let begreper = [begreperNaturfag, begreperMatematikk]

let antallKategorier = begreper.length;

//let r = Math.floor(Math.random()*2)
let r = Math.floor(dayOffset) % antallKategorier
//console.log(r)

let muligeOrd = begreper[r]

/*
let muligeOrd;
if (r == 0){
    muligeOrd = begreperNaturfag
    //meldingEl.innerHTML = "<h2>Hint: Et begrep innen naturfag<h2>"
}else if(r == 1){
    muligeOrd = begreperMatematikk
    //meldingEl.innerHTML = "<h2>Hint: Et begrep innen matematikk/økonomi<h2>"
}
*/



// Det korrekte ordet (fasit)
let fasit = muligeOrd[Math.floor(dayOffset) % muligeOrd.length]
//let fasit = "lekse"
fasit = fasit.toUpperCase()
//console.log(fasit)

// Sikrer at fasiten er i ordlista
if(!lovligeOrd.includes(fasit)){
    console.log("Legger fasit til i ordlista")
    lovligeOrd.push(fasit)
}






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
    meldingEl.innerHTML = ""
    if(e.key == "Enter" && this.value.length == nLetters){
        if (!lovligeOrd.includes(inputEl.value.toUpperCase())){
            console.log("Ordet finnes ikke i ordlista")
            meldingEl.innerHTML = "<h2>Ordet finnes ikke i ordlista</h2>"
            
        }else {
            console.log("Sjekker rad")

            sjekkRad(this.value.toUpperCase(), radNr)

            // Øker radnr
            radNr++

            // Tømmer input feltet
            this.value = ""

            if (radNr > nRows && !vant) {
                console.log("Du tapte")
                inputEl.classList.toggle('hide')
                meldingEl.innerHTML = `<h1>Du tapte...</h1>`
                meldingEl.innerHTML += `<h2>Ordet var: ${fasit}</h2>`
            }
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
    for(let i=0; i<nLetters; i++){
        if(svar[i]==fasit[i]){
            radEl[i].classList.add("greenBox")
            antRett++
        }
    }

    // Scroller til raden
    radEl[0].scrollIntoView()

    // Hvor mange rett
    //console.log(antRett)

    if(antRett == nLetters){
        //console.log("Du vant!")
        vant = true
        inputEl.classList.toggle('hide')
        reglerEl.innerHTML += `<h1>Du klarte det!</h1>`
    }
}