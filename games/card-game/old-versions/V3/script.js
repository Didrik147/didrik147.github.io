// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')
const endTurnBtn = document.querySelector('#end-turn')
const middleEl = document.querySelector('.middle')
const deckEl = document.querySelector('.deck')
const discardPileEl = document.querySelector('.discard-pile')
let cardEls;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let middleElInfo = middleEl.getBoundingClientRect()
canvas.width = middleElInfo.width
canvas.height = middleElInfo.height

window.addEventListener("resize", () => {
  middleElInfo = middleEl.getBoundingClientRect();
  canvas.width = middleElInfo.width
  canvas.height = middleElInfo.height
})

// Class for enemies
class Enemy {
  constructor(name, health) {
    this.name = name
    this.health = health

    this.img = new Image();
    this.img.src = './assets/crow.png';
    this.height = 200

    this.img.onload = (e) => {
      let ratio = this.img.naturalWidth/this.img.naturalHeight
      this.width = this.height*ratio
      this.draw()
    }
  }

  draw(){
    ctx.drawImage(
      this.img, 
      canvas.width/2 - this.width/2, 
      canvas.height/2 - this.height/2, 
      this.width, 
      this.height
    )
  }
}

ctx.fillStyle = "#ccc";
ctx.fillRect(0, 0, canvas.width, canvas.height);



crow = new Enemy("Crow", 4)

 



// Class to make card objects
class Card {
  constructor(name, text, src, id) {
    this.name = name
    this.text = text
    this.src = src
    this.id = id
  }

  play(){
    console.log(this.text)
  }
}

class CardDraw extends Card {
  constructor(name, text, src, id){
    super(name, text, src, id)
  }

  play(){
    console.log(this.text)
    drawCard()
  }
}


// Function to shuffle an array
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

// Empty deck
let deckArr = []

// Filling the deck
let deck_size = 40
for (let id = 0; id < deck_size; id++) {
  if (id < deck_size * 0.3) {
    deckArr.push(new Card("Sword", 'Deal 2 damage', './assets/sword.png', id))
  } else if (id < deck_size * 0.8) {
    deckArr.push(new CardDraw("Tea", 'Draw a card', './assets/tea.png', id))
  }else if (id < deck_size * 0.9) {
    deckArr.push(new Card("Cake", 'Restore 3 health', './assets/chocolate-cake.png', id))
  }
  else {
    deckArr.push(new Card("Healing Potion", 'Restore 6 health', './assets/potion.png', id))
  }
}


// Shuffle the deck
deckArr = shuffle(deckArr)

// Array for cards in discard pile
let discardArr = []

// Array for cards in hand
let handArr = []

function updateHandHTML() {
  myHandEl.innerHTML = ""
  handArr.forEach(card => {
    myHandEl.innerHTML += `
    <div class="card before-draw" draggable="true">
        <div class="name" id="${card.id}">
            <h1>${card.name}</h1>
        </div>
        <div class="image-container" style="background-image: url('${card.src}');">
            
        </div>
        <div class="text-container">
          <p>${card.text}</p>
        </div>
    </div>
    `
  })

  // Get cards from DOM
  cardEls = document.querySelectorAll('.card')

  for (let i = 0; i < cardEls.length; i++) {
    setTimeout(() => {
      cardEls[i].classList.remove('before-draw')
      cardEls[i].addEventListener('dragstart', dragStart)
      cardEls[i].addEventListener('dragend', dragEnd)
    }, (i + 1) * 200)
  }
}

// Draw cards
function drawCards(n) {
  let drawnCards = deckArr.slice(0, n)
  handArr = handArr.concat(drawnCards)

  // Removes cards from deck that was drawn 
  deckArr = deckArr.filter(card => !handArr.find(rm => (rm.id == card.id)))

  updateDeckHTML()

  setTimeout(() => {
    endTurnBtn.addEventListener('click', endTurn)
  }, 1000);

}

// Function that draws 1 card
function drawCard() {
  let newCard = deckArr.splice(-1, 1)[0]
  handArr.push(newCard)

  myHandEl.innerHTML += `
    <div class="card before-draw" draggable="true">
        <div class="name" id="${newCard.id}">
            <h1>${newCard.name}</h1>
        </div>
        <div class="image-container" style="background-image: url('${newCard.src}');">
            
        </div>
        <div class="text-container">
          <p>${newCard.text}</p>
        </div>
    </div>
    `

  updateDeckHTML()

  cardEls = document.querySelectorAll('.card')

  for (let i = 0; i < cardEls.length; i++) {
    setTimeout(() => {
      cardEls[i].classList.remove('before-draw')
      cardEls[i].addEventListener('dragstart', dragStart)
      cardEls[i].addEventListener('dragend', dragEnd)
    }, 10)
  }


}

function emptyHand() {
  myHandEl.innerHTML = ""
}


function updateDeckHTML() {
  deckEl.innerHTML = deckArr.length
}

function updateDiscardHTML() {
  discardPileEl.innerHTML = discardArr.length
}


// Draw initial hand
drawCards(5)
updateHandHTML()




//updateHandHTML()
updateDiscardHTML()


// Adding listeners to the middle zone
middleEl.addEventListener('dragover', dragOver)
middleEl.addEventListener('dragenter', dragEnter)
middleEl.addEventListener('dragleave', dragLeave)
middleEl.addEventListener('drop', dragDrop)


function endTurn() {
  // Remove button listener to avoid spamming
  endTurnBtn.removeEventListener('click', endTurn)
  cardEls = document.querySelectorAll('.card')

  cardEls.forEach(cardEl => {
    cardEl.classList.add('discard')
  })

  setTimeout(() => {
    handArr.forEach(card => {
      discardArr.push(card)
    })
    updateDiscardHTML()

    // Empty my hand
    handArr = []
    drawCards(5)
    updateHandHTML()

  }, 500)
}


let dragged = null

// Drag Functions
function dragStart(e) {
  //console.log("Start")

  dragged = e.target
  this.classList.add('hold')
}

function dragEnd() {
  //console.log("End")
  this.classList.remove('hold')
}

function dragOver(e) {
  //console.log('over')
  e.preventDefault()
}

function dragEnter(e) {
  //console.log('enter')
  e.preventDefault()
}

function dragLeave() {
  //console.log('leave')
}

function dragDrop(e) {
  //console.log('drop')
  if (e.target.className === "middle") {
    let id = dragged.children[0].id

    // Add card to discard
    playedCard = handArr.find((card) => card.id == id)
    
    discardArr.push(playedCard)
    updateDiscardHTML()

    // Remove card from hand
    handArr = handArr.filter((card) => card.id != id)
    dragged.parentNode.removeChild(dragged);

    // Use the card effect
    playedCard.play()
  }
}