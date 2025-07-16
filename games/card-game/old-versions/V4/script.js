// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')
const endTurnBtn = document.querySelector('#end-turn')
const middleEl = document.querySelector('.middle')
const topEl = document.querySelector('.top')
const deckEl = document.querySelector('.deck')
const discardPileEl = document.querySelector('.discard-pile')
const dialogBoxEl = document.querySelector('.dialog-box')

// Room number is saved in localStorage

let roomNumber = 1

/* if(!localStorage.roomNumber){
  localStorage.roomNumber = 1
}else {
  roomNumber = Number(localStorage.roomNumber)
} */

function nextRoom(){
  roomNumber += 1
  //localStorage.roomNumber = roomNumber

  location.reload()
}


// Class for player
class Player {
  constructor(name, health, energy) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = health
    this.maxEnergy = energy
    this.currentEnergy = energy
  }

  heal(h){
    console.log(`You restored ${h} health`)
    this.currentHealth += h

    if (this.currentHealth > this.maxHealth){
      this.currentHealth = this.maxHealth
    }
    
    updateTopHTML()
  }
}


let player = new Player('Didrik', 40, 3)


function updateTopHTML() {
  topEl.innerHTML = `
    <h3>Energy: ${player.currentEnergy}/${player.maxEnergy}</h3>
    <h3>Your health: ${player.currentHealth}/${player.maxHealth}</h3>
    <h3>Room: ${roomNumber}</h3>
  `
}

updateTopHTML()



function checkVictory() {
  let allDead = true
  enemies.forEach(enemy => {
    if (enemy.currentHealth > 0) {
      allDead = false
    }
  })

  return allDead
}


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
      cardEls[i].addEventListener('dragend', dragStart)
    }, (i + 1) * 200)
  }
}

// Draw cards
function drawCards(n) {
  if (deckArr.length < n){
    deckArr = deckArr.concat(shuffle(discardArr))
    discardArr = []
    updateDiscardHTML()
  }
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
  if (deckArr.length == 0){
    deckArr = shuffle(discardArr)
    discardArr = []
    updateDiscardHTML()
  }
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


function timedDialogBox(t=0, msg=''){
  setTimeout(() => {
    dialogBoxEl.innerHTML = msg
  }, t)
}


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

    enemies.forEach(enemy => {
      enemy.turn()
    })
  }, 500)

  setTimeout(() => {
    if (player.currentHealth > 0){
      drawCards(5)
      updateHandHTML()
      player.currentEnergy = player.maxEnergy
      updateTopHTML()
      timedDialogBox(4500)
    }else {
      gameOver()
    }
    
  }, 3000) 
}

function gameOver(){
  dialogBoxEl.innerHTML = '<h1>Game Over</h1>'
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
    if (player.currentEnergy > 0){  
      let id = dragged.children[0].id

      // Add card to discard
      let playedCard = handArr.find((card) => card.id == id)

      discardArr.push(playedCard)
      updateDiscardHTML()

      // Remove card from hand
      handArr = handArr.filter((card) => card.id != id)
      dragged.parentNode.removeChild(dragged);

      // Use the card effect
      playedCard.play()
    }else {
      timedDialogBox(0, 'Not enough energy')
    }
  }
}
