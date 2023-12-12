// Henter elementer fra DOM
let targetColorEl = document.querySelector('#targetColor')
let resultatEl = document.querySelector('#resultat')
let newBtn = document.querySelector('#new')
let containerEl = document.querySelector('.container')
let bodyEl = document.querySelector('body')
let highscoreEl = document.querySelector('#highscore')
let poengEl = document.querySelector('#poeng')
let lifeContainerEl = document.querySelector('#life-container')

let fargeboksEls;
let targetColor;

let poeng = 0

let antallBokser = 6

let maxLife = 3
let currentLife = maxLife

// Sjekker om highscore finnes
if(!localStorage.highscore){
    localStorage.highscore = 0
}




function makeBoxes(n){
    containerEl.innerHTML = ""

    for(let i=0; i<n; i++){
        containerEl.innerHTML += `<div class="fargeboks"></div>`
    }
}


function updateLife(){
    lifeContainerEl.innerHTML = ""
    for(let i=0; i<currentLife; i++){
        lifeContainerEl.innerHTML += `
            <i class="fa-solid fa-heart"></i>
        `
    }
}


// Funksjon som lager nytt spill
function newGame(){
    highscoreEl.innerHTML = `High score: ${localStorage.highscore}`
    bodyEl.style.backgroundColor = "white"
    newBtn.classList.add("hide")
    resultatEl.innerHTML = "Trykk på en boks"
    targetColor = randomColor()

    makeBoxes(antallBokser)

    fargeboksEls = document.querySelectorAll('.fargeboks')

    targetColorEl.innerHTML = targetColor

    let tall = Math.floor(Math.random()*fargeboksEls.length)

    for(let i=0; i<fargeboksEls.length; i++){
        fargeboksEls[i].style.opacity = 1;
        fargeboksEls[i].addEventListener('click', checkBox)

        if (i == tall){
            fargeboksEls[i].style.backgroundColor = targetColor
        }else {
            fargeboksEls[i].style.backgroundColor = randomColor()
        }
    }
}

// Lager nytt spill når vi laster inn nettsiden
newGame()

newBtn.addEventListener('click', newGame)


// Funksjon som sjekker om vi trykket på riktig boks
function checkBox(e){
    if (e.target.style.backgroundColor == targetColor){
        // Korrekt
        resultatEl.innerHTML = "Du klarte det!"
        newBtn.classList.remove("hide")
        poeng += 1

        containerEl.innerHTML = ""

        bodyEl.style.backgroundColor = targetColor
        
        /*
        for(let i=0; i<fargeboksEls.length; i++){
            fargeboksEls[i].removeEventListener('click', checkBox)
            
            fargeboksEls[i].style.backgroundColor = targetColor   
        }
        */

    }else{
        // Feil
        resultatEl.innerHTML = "Feil..."
        currentLife -= 1

        e.target.style.opacity = 0
    }

    updateLife()

    poengEl.innerHTML = `Antall poeng: ${poeng}`

    

    checkGameOver()
}

function checkGameOver(){
    if (currentLife <= 0){
        containerEl.innerHTML = ""
        bodyEl.innerHTML += "<h2>Du gikk tom for liv</h2>"

        // Oppdaterer high score
        if (poeng > Number(localStorage.highscore)){
            
            bodyEl.innerHTML += "<h2>Du fikk en ny high score!</h2>"
            localStorage.highscore = poeng
            highscoreEl.innerHTML = `High score: ${localStorage.highscore}`
        }

        bodyEl.innerHTML += "<button id='again'>Prøv igjen</button>"

        let againEl = document.querySelector('#again') 
        againEl.addEventListener('click', reloadPage)
        
        //resultatEl.innerHTML = "Du gikk tom for liv"
    }
}


function reloadPage(){
    window.location.reload()
}


// Funskjon som lager en tilfeldig farge
function randomColor(){
    let r = Math.floor(Math.random()*256)
    let g = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random()*256)

    return `rgb(${r}, ${g}, ${b})`
}