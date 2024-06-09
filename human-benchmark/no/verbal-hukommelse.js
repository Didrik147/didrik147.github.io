const startBtn = document.querySelector('.start-btn')
const heroEl = document.querySelector('.hero')
startBtn.addEventListener("click", startGame)

let wordArr = []
let seenArr = []
let currentWord = ""
let score = 0
let lives = 3

let scoreEl
let livesEl
let wordEl

function startGame(){
    wordArr = frekvensordliste
    currentWord = newWord(wordArr)

    heroEl.innerHTML = ''

    heroEl.innerHTML += `<div>
        <div class="row">
            <div>Antall liv: <span class="lives">3</span></div>
            <div>Score: <span class="score">0</span></div>
        </div>
        <div class="word">${currentWord}</div>

        <div class="row">
            <button id="sett" class="sett-btn">SETT</button>
            <button id="ny" class="ny-btn">NY</button>
        </div>
    </div>`

    scoreEl = document.querySelector('.score')
    livesEl = document.querySelector('.lives')
    wordEl = document.querySelector('.word')

    let buttons = document.querySelectorAll('button')

    buttons.forEach(button => {
        button.addEventListener('click', checkAnswer)
    })
}


function newWord(words){
    return words[Math.floor(Math.random()*words.length)];
}

function checkAnswer(e){
    if (seenArr.includes(currentWord)){
        if (e.target.id == "sett"){
            console.log("Correct!")
            score += 1
        }else {
            console.log("Wrong...")
            lives--
        }
    }else {
        if (e.target.id == "ny"){
            console.log("Correct!")
            score += 1
        }else {
            console.log("Wrong...")
            lives--
        }
    }

    seenArr.push(currentWord)

    livesEl.innerHTML = lives
    scoreEl.innerHTML = score

    if (lives <= 0){
        heroEl.innerHTML = `<div>
            <div class="word">Din score: ${score}</div>
        </div>`
        }

    currentWord = newWord(wordArr)
    wordEl.innerHTML = currentWord
}