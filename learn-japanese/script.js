const gameEl = document.querySelector('.game-container')

let kanas = []

const characterEl = document.querySelector('.character')
const optionsEl = document.querySelector('.options')
const responseEl = document.querySelector('.response')

function shuffle(arr){
    return arr.sort(() => 0.5 - Math.random())
}

function getMultipleRandom(arr, num) {
    const shuffled = shuffle(arr);
  
    return shuffled.slice(0, num);
}


// Tilfeldig tall fra og med a til (men ikke med) b
function randint(low,high){
    return Math.floor(Math.random()*(high-low)) + low
}

let solution;

let points;
let q;
let difficulty;

function newGame(){
    console.log('Starting new game')
    points = 0
    q = 0

    characterEl.innerHTML = '<p><i>Choose difficulty</i></p>'

    optionsEl.innerHTML = ''
    optionsEl.classList.add("choose-difficulty")
    optionsEl.innerHTML += `<button class="difficulty" id="easy">Easy</button>`
    optionsEl.innerHTML += `<button class="difficulty" id="medium">Medium</button>`
    optionsEl.innerHTML += `<button class="difficulty" id="hard">Hard</button>`

    let difficultyEls = document.querySelectorAll('.difficulty')

    difficultyEls.forEach(difficulty => {
        difficulty.addEventListener("click", setDifficulty)
    })

    //question()
}

function setDifficulty(e){
    optionsEl.classList.remove("choose-difficulty")
    difficulty = e.target.id
    /*
    if (e.target.id == "easy"){
        difficulty = 0
    }else if(e.target.id == "medium"){
        difficulty = 1
    }else if (e.target.id == "hard") {
        difficulty = 2
    }
    */
    characterEl.classList.add('circle')

    let gojuuonArr = []

    manyKanas.forEach(k => {
        if (k.type == "gojuuon") {
            gojuuonArr.push(k)
        }
    })

    let n;
    if (difficulty == "easy") {
        n = 4 * 3 // rows: a, ka,sa
    } else if (difficulty == "medium") {
        n = 4 * 6 // rows: a, ka, sa, ta, na, ha
    } else if (difficulty == "hard") {
        n = gojuuonArr.length // all gojuuon
    }
    
    for(let i=0; i<n; i++){
        kanas.push(gojuuonArr[i])
    }
        

    console.log(`Difficulty: ${difficulty}`)
    console.log(`Number of kanas: ${n}`)
    question()
}



function next(){
    if (q < 3){
        question()
    }else {
        gameEl.innerHTML = `
            <p class='score'>Your score: ${points}/${q}</p>
            <button id='again'>Try again?</button>
        `
        audioEl.src = './audio/victory-fanfare-ffvii.mp3'
        playAudio()

        document.querySelector('#again').addEventListener('click', () => {
            // Find a better way to do this?
            window.location.reload();
        })
    }
}

const audioEl = document.querySelector('#audio')
const pronunciationEl = document.querySelector('#pronunciation')



/* Pronunciation sound files are downloaded from:
https://thejapanesepage.com/learn-hiragana/
 */

function playAudio(e){
    //console.log(`${e.target.id}.mp3`)
    audioEl.play()
}

function playPronunciation(e){
    //console.log(`${e.target.id}.mp3`)
    /* pronunciationEl.src = `./audio/pronunciation/${e.target.id}.mp3` */
    pronunciationEl.play()
}


function question(){
    q++;

    characterEl.innerHTML = ''
    optionsEl.innerHTML = ''
    responseEl.innerHTML = ''

    let i = randint(1, kanas.length)
    characterEl.innerHTML = kanas[i].kana
    characterEl.id = kanas[i].roumaji
    
    characterEl.addEventListener('click', playPronunciation)
    
    solution = kanas[i].roumaji 

    let wrongArr = []

    kanas.forEach(kana => {
        wrongArr.push(kana.roumaji)
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

    pronunciationEl.src = `./audio/pronunciation/${characterEl.id}.mp3`
    pronunciationEl.load()
}


function checkAnswer(e){
    buttonEls.forEach(buttonEl => {
        buttonEl.removeEventListener('click', checkAnswer)
        buttonEl.classList.add('inactive')
        if(buttonEl.innerHTML === solution){
            buttonEl.classList.add('correct-bg')
        }
    })
    /* e.target.classList.add('chosen') */
    if (e.target.innerText === solution){
        //console.log("Correct!")
        responseEl.innerHTML = '<h1 class="correct-text">Correct!</h1>'
        /* e.target.classList.add('correct-bg') */
        audioEl.src = `./audio/yay.mp3`
        audioEl.play()

        points++
    }else {
        //console.log("Wrong!")
        responseEl.innerHTML = '<h1 class="wrong-text">Wrong!</h1>'
        e.target.classList.add('wrong-bg')
        audioEl.src = `./audio/negative_beeps.mp3`
        audioEl.play()
    }

    responseEl.innerHTML += `
        <button onClick=next()>Next kana</button>
    `

    responseEl.scrollIntoView()

    console.log(`Points: ${points}`)

}


// Starting the game
newGame()