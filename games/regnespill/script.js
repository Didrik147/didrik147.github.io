// Henter elementer fra DOM
let bodyEl = document.querySelector('body')

let oppgaveEl = document.querySelector('#oppgave')
let svarEl = document.querySelector('#svar')

let sjekkBtn = document.querySelector('#sjekk')
let nyBtn = document.querySelector('#ny')

let konklusjonEl = document.querySelector('#konklusjon')

/* Henter hamburgerelementet */
const burgerEl = document.querySelector('.fa-bars')

/* Henter lenkene i navbaren */
const lenkerEl = document.querySelector('.lenker')

let poengEl = document.querySelector('#poeng')

let streak = 0

// Legger til lytter til hamburgerikonet 
burgerEl.addEventListener('click', visLenker)

function visLenker(){
    lenkerEl.classList.toggle('vis')
}

let regneart = svarEl.className

// Global variabel for fasit
let fasit

// Trekker første oppgave ved å kalle på funksjonen
nyOppgave()

// Funksjon som lager ny oppgave
function nyOppgave(){
    // Nullstiller input feltet
    svarEl.value = ""
    svarEl.classList.remove("wrong")
    svarEl.classList.remove("correct")

    // Nullstiller knappene
    sjekkBtn.style.display = "inline-block"
    nyBtn.style.display = "none"

    // Fjerner fargeklasse fra body
    bodyEl.classList.remove("wrong")
    bodyEl.classList.remove("correct")

    // Lager et tilfeldig heltall mellom 0 og 9
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);


    if (regneart == "multiplikasjon"){
        // Oppdaterer variabelen fasit
        fasit = a*b

        // Bruker template literal til å kombinere tekst og variabler
        oppgaveEl.innerHTML = `${a} x ${b} = ?`

    }else if (regneart == "addisjon"){
        fasit = a+b
        oppgaveEl.innerHTML = `${a} + ${b} = ?`
    }else if (regneart == "subtraksjon"){
        fasit = a-b
        oppgaveEl.innerHTML = `${a} - ${b} = ?`
    }

    // Tømmer elementet med konklusjonen
    konklusjonEl.innerHTML = ""
}



// Funksjon som sjekker om vi har rett svar
function sjekkSvar(){
    console.log("Sjekker svaret")

    // Henter verdien fra input elementet. Gjør om til tall
    let svar = Number(svarEl.value)

    if (svarEl.value == ""){
        konklusjonEl.innerHTML = "Skriv inn et tall"
    }else {
        // Sjekker om svaret er det samme som fasiten
        if (svar == fasit){
            konklusjonEl.innerHTML = "Du har rett!"

            // Legger til klassen "correct" i input elementet 
            svarEl.classList.add("correct")
            bodyEl.classList.add("correct")
            //svarEl.className += " correct"

            streak += 1
        } else {
            konklusjonEl.innerHTML = "Du har dessverre feil..."
            // Legger til klassen "wrong" i input elementet 
            svarEl.classList.add("wrong")
            bodyEl.classList.add("wrong")

            streak = 0
        }

        // Skjuler knappen som sjekker svaret
        sjekkBtn.style.display = "none"

        // Viser knappen som lager ny oppgave
        nyBtn.style.display = "inline-block"

        poengEl.innerHTML = `Du har klart ${streak} på rad`
    }   
}


// Legger til lyttere til knappene
sjekkBtn.addEventListener('click', sjekkSvar)
nyBtn.addEventListener('click', nyOppgave)