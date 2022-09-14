const gameEl = document.querySelector('.game-container')

/* let kana = {
    romaji: 'a',
    hiragana: 'あ',
    katakana: 'ア'
} */

class Kana {
    constructor(romaji, hiragana, katakana){
        this.romaji = romaji
        this.hiragana = hiragana
        this.katakana = katakana
    }
}

let kanas = []

//let k = new Kana('a', 'あ', 'ア')
//kanas.push(k)
kanas.push(new Kana('a', 'あ', 'ア'))
kanas.push(new Kana('i', 'い'))
kanas.push(new Kana('u', 'う'))
kanas.push(new Kana('e', 'え'))
kanas.push(new Kana('o', 'お'))

kanas.push(new Kana('ka', 'か'))
kanas.push(new Kana('ki', 'き'))
kanas.push(new Kana('ku', 'く'))
kanas.push(new Kana('ke', 'け'))
kanas.push(new Kana('ko', 'こ'))

kanas.push(new Kana('sa', 'さ'))
kanas.push(new Kana('shi', 'し'))
kanas.push(new Kana('su', 'す'))
kanas.push(new Kana('se', 'せ'))
kanas.push(new Kana('so', 'そ'))

kanas.push(new Kana('ta', 'た'))
kanas.push(new Kana('chi', 'ち'))
kanas.push(new Kana('tsu', 'つ'))
kanas.push(new Kana('te', 'て'))
kanas.push(new Kana('to', 'と'))

kanas.push(new Kana('na', 'な'))
kanas.push(new Kana('ni', 'に'))
kanas.push(new Kana('nu', 'ぬ'))
kanas.push(new Kana('ne', 'ね'))
kanas.push(new Kana('no', 'の'))

kanas.push(new Kana('ha', 'は'))
kanas.push(new Kana('hi', 'ひ'))
kanas.push(new Kana('fu', 'ふ'))
kanas.push(new Kana('he', 'へ'))
kanas.push(new Kana('ho', 'ほ'))

kanas.push(new Kana('ma', 'ま'))
kanas.push(new Kana('mi', 'み'))
kanas.push(new Kana('mu', 'む'))
kanas.push(new Kana('me', 'め'))
kanas.push(new Kana('mo', 'も'))

kanas.push(new Kana('ya', 'や'))
kanas.push(new Kana('yu', 'ゆ'))
kanas.push(new Kana('yo', 'よ'))

kanas.push(new Kana('ra', 'ら'))
kanas.push(new Kana('ri', 'り'))
kanas.push(new Kana('ru', 'る'))
kanas.push(new Kana('re', 'れ'))
kanas.push(new Kana('ro', 'ろ'))

kanas.push(new Kana('wa', 'わ'))
kanas.push(new Kana('wo', 'を'))
kanas.push(new Kana('n', 'ん'))



//console.log(kanas)

characterEl = document.querySelector('.character')
optionsEl = document.querySelector('.options')
responseEl = document.querySelector('.response')

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

function newGame(){
    console.log('Starting new game')
    points = 0
    q = 0


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
    pronunciationEl.src = `./audio/pronunciation/${e.target.id}.mp3`
    pronunciationEl.play()
}


function question(){
    q++;

    characterEl.innerHTML = ''
    optionsEl.innerHTML = ''
    responseEl.innerHTML = ''

    let i = randint(1, kanas.length)
    characterEl.innerHTML = kanas[i].hiragana
    characterEl.id = kanas[i].romaji
    
    characterEl.addEventListener('click', playPronunciation)
    
    solution = kanas[i].romaji 

    let wrongArr = []

    kanas.forEach(kana => {
        wrongArr.push(kana.romaji)
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