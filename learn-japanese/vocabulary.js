const gameEl = document.querySelector('.game-container')


const wordEl = document.querySelector('.word')
const optionsEl = document.querySelector('.options')
const responseEl = document.querySelector('.response')
const infoEl = document.querySelector('#info')

function shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random())
}

function getMultipleRandom(arr, num) {
    const shuffled = shuffle(arr);

    return shuffled.slice(0, num);
}


// Tilfeldig tall fra og med a til (men ikke med) b
function randint(low, high) {
    return Math.floor(Math.random() * (high - low)) + low
}

let solution;

let points;
let q;
let difficulty;

function newGame() {
    console.log('Starting new game')
    console.log('Number of words: ' + words.length)
    points = 0
    q = 0

    wrongSoundEl.load()
    correctSoundEl.load()

    question()
}


function next() {
    if (q < 3) {
        question()
    } else {
        infoEl.innerHTML = ''
        gameEl.innerHTML = `
            <p class='score'>Your score: ${points}/${q}</p>
            <button id='again'>Try again?</button>
        `
        correctSoundEl.src = './audio/victory-fanfare-ffvii.mp3'
        correctSoundEl.play()

        document.querySelector('#again').addEventListener('click', () => {
            // Find a better way to do this?
            window.location.reload();
        })
    }
}

const correctSoundEl = document.querySelector('#correctSound')
const wrongSoundEl = document.querySelector('#wrongSound')


function question() {
    q++;

    wordEl.innerHTML = ''
    optionsEl.innerHTML = ''
    responseEl.innerHTML = ''

    let i = randint(1, words.length)
    wordEl.innerHTML += `<div>${words[i].kana}</div>`
    wordEl.innerHTML += `<div>(${words[i].roumaji})</div>`

    wordEl.id = words[i].roumaji

    solution = words[i].english

    let wrongArr = []

    words.forEach(word => {
        wrongArr.push(word.english)
    })

    // Fjerner det korrekte alternativet
    wrongArr.splice(i, 1)

    // Trekker 3 tilfeldige alternativer som er feil
    let alternatives = getMultipleRandom(wrongArr, 3)

    // Legger til det korrekte alternativet
    alternatives.push(solution)

    // Stokker om på alternativene
    shuffle(alternatives)

    //console.log(alternatives)
    alternatives.forEach(option => {
        optionsEl.innerHTML += `
            <button>${option}</button>
        `
    })

    buttonEls = document.querySelectorAll('.options > button')

    buttonEls.forEach(buttonEl => {
        buttonEl.addEventListener('click', checkAnswer)
    })
}

function checkAnswer(e) {
    buttonEls.forEach(buttonEl => {
        buttonEl.removeEventListener('click', checkAnswer)
        buttonEl.classList.add('inactive')
        if (buttonEl.innerHTML === solution) {
            buttonEl.classList.add('correct-bg')
        }
    })
    /* e.target.classList.add('chosen') */
    if (e.target.innerText === solution) {
        //console.log("Correct!")
        responseEl.innerHTML = '<h1 class="correct-text">Correct!</h1>'
        /* e.target.classList.add('correct-bg') */
        correctSoundEl.play()

        points++
    } else {
        //console.log("Wrong!")
        responseEl.innerHTML = '<h1 class="wrong-text">Wrong!</h1>'
        e.target.classList.add('wrong-bg')
        wrongSoundEl.play()
    }

    responseEl.innerHTML += `
        <button onClick=next()>Next kana</button>
    `

    responseEl.scrollIntoView()

    console.log(`Points: ${points}`)

}


// Starting the game
newGame()