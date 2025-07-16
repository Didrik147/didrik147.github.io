
// Lager spørsmålsobjekt
let IT_question1 = {
    query: "Hvem oppfant JavaScript?",
    options: ["Brendan Eich", "Larry Wall", "Rasmus Lerford"],
    solution: "Brendan Eich"
}

let IT_question2 = {
    query: "JavaScript er det samme som Java",
    options: ["Ja", "Nei"],
    solution: "Nei"
}

let IT_question3 = {
    query: "Når ble JavaScript oppfunnet?",
    options: ["1992", "1993", "1994", "1995"],
    solution: "1995"
}

// Lager et array med spørsmålene
let IT_questions = [
    IT_question1,
    IT_question2,
    IT_question3
]

let math_question1 = {
    query: "Hva er (ln x)' ?",
    options: ["ln x", "eˣ", "1/x", "x"],
    solution: "1/x"
}

let math_question2 = {
    query: "Hva er den deriverte av 4-4x ?",
    options: ["-4", "-1", "4", "1"],
    solution: "-4"
}

let math_question3 = {
    query: "Faktoriser uttrykket: x² + 2x - 8",
    options: [
        "(x + 2)(x + 4)", 
        "(x + 2)(x - 4)", 
        "(x - 2)(x + 4)", 
        "(x - 2)(x - 4)"
    ],
    solution: "(x - 2)(x + 4)"
}

let math_question4 = {
    query: "Hva er sin(30°) ?",
    options: [
        "0", 
        "0.5", 
        "1"
    ],
    solution: "0.5"
}

let math_questions = [
    math_question1,
    math_question2,
    math_question3,
    math_question4
]


let science_question1 = {
    query: "Hva kalles det å bytte ut syke gener med friske gener som fungerer?",
    options: [
        "Genetikk", "Genterapi", "Kloning", "DNA-testing"
    ],
    solution: "Genterapi"
}

let science_question2 = {
    query: "Hva er den komplementære basen til guanin (G)?",
    options: [
        "Cytosin (C)", "Adenin (A)", "Tymin (T)", "Uracil (U)"
    ],
    solution: "Cytosin (C)"
}

let science_questions = [
    science_question1,
    science_question2
]


let questions;

let tema_ordbok = {
    "it" : IT_questions,
    "matematikk" : math_questions,
    "naturfag" : science_questions
}


// Henter elementer fra DOM
let quizContainerEl = document.querySelector('.quiz-container')

let getBtn = document.querySelector('#btn-get')
let checkBtn = document.querySelector('#btn-check')

let resultatEl = document.querySelector('#resultat')

let temaContainerEl = document.querySelector('.tema-container')
let temaSelectEl = document.querySelector('#tema-select')

getBtn.addEventListener('click', getQuestions)

function getQuestions() {
    questions = tema_ordbok[temaSelectEl.value]


    temaContainerEl.classList.add('hide')
    getBtn.classList.add('hide')
    checkBtn.classList.remove('hide')

    // Tømmer HTML til quiz containeren
    quizContainerEl.innerHTML = ''

    // Traverserer array med spørsmål
    for (let i = 0; i < questions.length; i++) {
        // Henter et spørsmål
        let question = questions[i]

        // Henter spørsmålsteksten
        let query = question.query

        // Henter alternativene
        let options = question.options

        // Henter fasit
        let solution = question.solution

        // Fyller quiz containeren med spørsmålet
        quizContainerEl.innerHTML += `
    <div class="question-container" id="question${i + 1}">
        <h3>${i+1}. ${query}</h3>
    </div>
    `

        /* Skriv kode som fyller inn alternativene i HTML */

        // Henter elementet alternativene skal skrives i
        let questionEl = document.getElementById(`question${i + 1}`)
        //let questionEl = document.querySelector(`#question${i+1}`)

        // Går gjennom alternativene
        for (let j = 0; j < options.length; j++) {
            // Lager label element
            let labelEl = document.createElement('label')

            // Lager et input element
            let radioEl = document.createElement('input')

            // Setter typen til input elementet til radio
            radioEl.type = "radio"

            // Sørger for at alle alternativene til spørsmålet er i samme gruppe
            radioEl.name = `q${i + 1}`

            // Setter verdi til elementet basert på om alternativet er lik fasiten
            if (options[j] === solution) {
                radioEl.value = "c" // correct
            } else {
                radioEl.value = "w" // wrong
            }

            // Legger input-elementet med type radio i label elementet
            labelEl.appendChild(radioEl)

            // Skriver alternativene til HTML
            labelEl.innerHTML += options[j]

            // Legger label elementet inni question elementet
            questionEl.appendChild(labelEl)
        }
    }
}



// Funksjon som finner poeng basert på antall rett
checkBtn.addEventListener('click', finnPoeng)

// Funksjon som finner poeng basert på antall rett
function finnPoeng() {
    console.log("Finner poeng")

    checkBtn.classList.add('hide')

    let poeng = 0

    // Henter alle radio-elementene
    let radioEls = document.querySelectorAll('input[type="radio"]')

    // Traverserer radio-elementene
    for (let i = 0; i < radioEls.length; i++) {
        // Sjekker om alternativet er krysset av
        if (radioEls[i].checked) {
            // Sjekker om alternativet er korrekt
            if (radioEls[i].value === "c") {
                // Øker antall poeng
                poeng++ // samme som poeng += 1
            }
        }

        // Gjør slik at man ikke kan trykke på radioknappene lenger
        radioEls[i].disabled = true
    }

    // Skriver til resultat-elementet
    resultatEl.innerHTML = `Du fikk ${poeng}/${questions.length} poeng`
}