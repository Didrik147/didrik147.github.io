// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')
const enemiesEl = document.querySelector('.enemies')
const endTurnBtn = document.querySelector('#end-turn')
const middleEl = document.querySelector('.middle')
const topEl = document.querySelector('.top')
const deckEl = document.querySelector('.deck')
const discardPileEl = document.querySelector('.discard-pile')
const dialogBoxEl = document.querySelector('.dialog-box')
let cardEls;
let enemyEls;
let enemyEl;


// Room number is saved in localStorage

let roomNumber = 1

if(!localStorage.roomNumber){
  localStorage.roomNumber = 1
}else {
  roomNumber = Number(localStorage.roomNumber)
}


// Function that creates a random number between a and b (inclusive)
function randomInteger(a, b) {
  return Math.floor(Math.random() * b) + a
}

// Class for player
class Player {
  constructor(name, health) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = 8
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


let player = new Player('Didrik', 10)


function updateTopHTML() {
  topEl.innerHTML = `
    <h3>Your health: ${player.currentHealth}/${player.maxHealth}</h3>
    <h3>Room: ${roomNumber}</h3>
  `
}

updateTopHTML()


// Class for enemies
class Enemy {
  constructor(name, health, src) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = health

    this.src = src
  }

  turn() {
    let randomInt = randomInteger(1, 100)

    if (randomInt <= 40) {
      console.log("Peck")
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} uses its beak to peck</p>
      `
      }, 200)
      setTimeout(() => {
        dialogBoxEl.innerHTML += `
        <p>It deals 2 damage</p>
      `
        player.currentHealth -= 2
        updateTopHTML()
      }, 1200)

    } else {
      console.log("Scratch")
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} uses its claw to scratch</p>
      `
      }, 200)
      setTimeout(() => {
        dialogBoxEl.innerHTML += `
        <p>It deals 1 damage</p>
      `
        player.currentHealth -= 1
        updateTopHTML()
      }, 1200)
    }
  }
}


let enemies = []

crow = new Enemy("Crow", 2, './assets/crow.png')
enemies.push(crow)
let enemy = enemies[0]

function updateEnemiesHTML() {
  enemiesEl.innerHTML = ""

  enemies.forEach(enemy => {
    enemiesEl.innerHTML += `
      <div class='enemy'>
        <img src='${enemy.src}'
      </div>
    `
  })

  enemyEls = document.querySelectorAll('.enemy')
  enemyEl = enemyEls[0]
}

updateEnemiesHTML()




function checkEnemyDeath(enemy) {
  if (enemy.currentHealth <= 0) {
    enemyEl.classList.add('dead')
  }

  setTimeout(() => {
    if (checkVictory()) {
      middleEl.classList.add('flex')
      middleEl.innerHTML = `
        <h2>You defeated all enemies!</h2>
        <button onClick='nextRoom()'>Next room</button>
      `
    }
  }, 1200)
}

function nextRoom(){
  roomNumber += 1
  localStorage.roomNumber = roomNumber

  location.reload()
}


function checkVictory() {
  let allDead = true
  enemies.forEach(enemy => {
    if (enemy.currentHealth > 0) {
      allDead = false
    }
  })

  return allDead
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
  if (id < deck_size * 0.4) {
    deckArr.push(new CardDamage("Sword", 'Deal 2 damage', './assets/sword.png', id))
  } else if (id < deck_size * 0.6) {
    deckArr.push(new CardDraw("Tea", 'Draw a card', './assets/tea.png', id))
  } else if (id < deck_size * 1) {
    deckArr.push(new CardHeal("Cake", 'Restore 3 health', './assets/chocolate-cake.png', id))
  }
/*   else {
    deckArr.push(new Card("Healing Potion", 'Restore 6 health', './assets/potion.png', id))
  } */
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

    enemies.forEach(enemy => {
      enemy.turn()
    })
  }, 500)

  setTimeout(() => {
    drawCards(5)
    updateHandHTML()
  }, 3000)

  setTimeout(() => {
    dialogBoxEl.innerHTML = ''
  }, 4500)


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
    let playedCard = handArr.find((card) => card.id == id)

    discardArr.push(playedCard)
    updateDiscardHTML()

    // Remove card from hand
    handArr = handArr.filter((card) => card.id != id)
    dragged.parentNode.removeChild(dragged);

    // Use the card effect
    playedCard.play()
  }
}
