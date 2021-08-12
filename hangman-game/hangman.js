/*
Based on the following tutorial:
https://www.youtube.com/watch?v=dgvyE1sJS3Y
*/

/*
Andre ideer til tema:
-Gloseprøve engelsk
-Land
-Hovedsteder
-Fylker i Norge
-Mat
-Grunnstoffer
*/

var programming_languages = [
    "python",
    "javascript",
    "kotlin",
    "swift",
    "go",
    "php",
    "matlab",
    "fortran",
    "sql",
    "ruby",
    "pascal",
    "perl",
    "rust",
    "ada",
    "julia",
    "lisp",
    "cobol"
]

var topics = [
    "Programming languages", //programmeringsspråk
    "Capitals",     // hovedsteder
    "Countries",    // land
    "Elements"      // grunnstoffer
]

var topic = topics[0]

document.getElementById("topic").innerHTML = "Topic: " + topic

if (topic == topics[0]){
    var list_of_words = programming_languages
}else if (topic == topics[2]){
    var list_of_words = countries
}else if(topic == topics[3]){
    var list_of_words = elements
}


let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord(){
    answer = list_of_words[
        Math.floor(Math.random()*list_of_words.length)
    ]
    answer = answer.toUpperCase();
}

function generateButtons(){
    alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    let buttonsHTML = alphabet.split("").map(letter => 
        `
    <button
        class = "btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
    >
        ` + letter + `
    </button>
    `).join("");


    document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);

    if (answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkIfGameWon();
    }else if (answer.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture(){
    document.getElementById("hangmanPic").src = "images/" + mistakes + ".png"
}

function checkIfGameWon(){
    if (wordStatus === answer){
        document.getElementById("keyboard").innerHTML = "You Won!!!";
    }
}

function checkIfGameLost(){
    if (mistakes === maxWrong){
        document.getElementById("wordSpotlight").innerHTML = "The answer was: " + answer
        document.getElementById("keyboard").innerHTML = "You Lost...";
    }
}


function reset(){
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "images/0.png";

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}




function guessedWord(){
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistakes(){
    document.getElementById("mistakes").innerHTML = mistakes;
}


document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();