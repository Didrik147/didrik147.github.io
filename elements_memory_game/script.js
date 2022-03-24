/*
Based on the following tutorial by CodingNepal:
https://www.youtube.com/watch?v=DABkhfsBAWw
*/

const cardsEl = document.querySelector('.cards');
const wrapperEl = document.querySelector('.wrapper');


let colorArr = ['#FFFFFF', '#D9FFFF', '#CC80FF', '#C2FF00', '#FFB5B5', '#909090', '#3050F8', '#FF0D0D'];
let symbolArr = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O'];
let nameArr = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen'];
let numberArr = [1, 2, 3, 4, 5, 6, 7, 8];

function makeCards() {
    // creating array of 16 items and each item is repeated twice
    //let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    let arr = numberArr.concat(numberArr);
    
    // sorting array items randomly
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)

    let k;
    for(let i = 0; i < arr.length; i++){
        k = arr[i]-1
        cardsEl.innerHTML += `
            <li class="card">
                <div class="view front-view">
                    <span class="front-content">?</span>
                </div>
                <div class="view back-view" style="background-color: ${colorArr[k]}aa;">
                    <div class="back-content" id="${numberArr[k]}">
                        ${symbolArr[k]}
                    </div>
                </div>
            </li>
            `
    }
}

makeCards();

const cards = document.querySelectorAll('.card');


let matchedCard = 7;
let cardOne, cardTwo;
let disableDeck = false;



function flipCard(e) {
    let clickedCard = e.target; // getting user clicked card

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
            // return the cardOne value to clikedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneId = cardOne.querySelector('.back-content').id;
        let cardTwoId = cardTwo.querySelector('.back-content').id;

        matchCards(cardOneId, cardTwoId);
    }
}

function matchCards(id1, id2) {
    // if two card img matched
    if (id1 === id2) {
        matchedCard++; //increment matched value by 1

        // if matched value is 8 that means user has matched all the cards (8*2 = 16 cards)
        if (matchedCard == 8) {
            console.log("You Won!")
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        // setting both card value to blank
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // if two card not matched
    setTimeout(() => {
        // adding shake class to both card after 400ms
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);

    setTimeout(() => {
        // removing both shake & flip classes from both card after 1.2 seconds
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        // setting both card value to blank
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}



// Adding click event to all cards
cards.forEach(card => {
    //card.classList.add('flip');
    card.addEventListener('click', flipCard);
});