// DOM
let cardEls;

// Class to make card objects
class Card {
  constructor(name, text, src, id) {
    this.name = name
    this.text = text
    this.src = src
    this.id = id
  }

  play() {
    console.log(this.text)
    player.currentEnergy -= 1
    if (player.currentEnergy <= 0) {
      setTimeout(() => {
        endTurnBtn.classList.add('finished')
      }, 200)
    }
    updateTopHTML()
  }
}

class CardDraw extends Card {
  constructor(name, text, src, id, draw) {
    super(name, text, src, id)
    this.draw = draw
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You draw ${this.draw} cards</p>`
    for (let i = 0; i < this.draw; i++) {
      setTimeout(() => {
        drawCard()
      }, i * 300)
    }
  }
}

class CardDamage extends Card {
  constructor(name, text, src, id, dmg) {
    super(name, text, src, id)
    this.dmg = dmg
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You dealt ${this.dmg} damage</p>`
    dealDamage(this.dmg, enemy)
  }
}

class StowAway extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.dmg = 1
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You dealt ${this.dmg} damage</p>`
    dealDamage(this.dmg, enemy)

    dialogBoxEl.innerHTML += `<p>Top card moved from deck to discard.</p>`
    discardArr.push(deckArr.pop())
    updateDeckHTML()
    updateDiscardHTML()
  }
}

class DiscardDamage extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.dmg = 0
  }

  play() {
    super.play()
    this.dmg = discardArr.length - 1
    dialogBoxEl.innerHTML = `<p>You dealt ${this.dmg} damage</p>`
    dealDamage(this.dmg, enemy)
  }
}


class DeckDamage extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.dmg = 0
  }

  play() {
    super.play()
    this.dmg = deckArr.length
    dialogBoxEl.innerHTML = `<p>You dealt ${this.dmg} damage</p>`
    dealDamage(this.dmg, enemy)
  }
}


class CardHeal extends Card {
  constructor(name, text, src, id, life) {
    super(name, text, src, id)
    this.life = life
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You restored ${this.life} health</p>`
    player.heal(this.life)
  }
}


function dealDamage(dmg, enemy) {
  console.log("Enemy lost " + dmg + " health")
  enemy.currentHealth -= dmg
  currentHealthEl.style.width = `${100 * enemy.currentHealth / enemy.maxHealth}%`

  checkEnemyDeath(enemy)
}


// Function to shuffle an array
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

let deckArr = []

function createStartingDeck() {
  deckArr = []
  let deck_size = 10
  let cards = []

  cards = Array(deck_size).fill("Sword")

  if (localStorage.character == "lorekeeper") {
    cards.fill("Read Pages", 0, 5)
    cards.fill("Stow Away", 5, 8)
    cards.fill("That was a good book", 8, 9)
    cards.fill("Want to Read", 9, 10)
  } 
  else if(localStorage.character == "potions-master"){
    cards.fill("Acid Potion", 0, 5)
    cards.fill("Mana Potion", 5, 8)
    cards.fill("Healing Potion", 8, 10)
  }
  else if(localStorage.character == "bread-knight") {
    cards.fill("Sword", 0, 5)
    cards.fill("Tea", 5, 8)
    cards.fill("Cake", 8, 10)
  }

  let id = 0
  cards.forEach(card => {
    if (card == "Sword"){
      deckArr.push(new CardDamage(card, 'Deal 2 damage', './assets/sword.png', id, 2))
    }else if (card == "Tea") {
      deckArr.push(new CardDraw(card, 'Draw 2 cards', './assets/tea.png', id, 2))
    } 
    else if (card == "Cake") {
      deckArr.push(new CardHeal(card, 'Restore 3 health', './assets/chocolate-cake.png', id, 3))
    } 
    else if(card == "Acid Potion"){
      deckArr.push(new CardDamage(card, 'Deal 1 damage', './assets/green-potion.png', id, 1))
    } 
    else if (card == "Mana Potion") {
      deckArr.push(new CardDraw(card, 'Draw 2 cards', './assets/purple-potion.png', id, 2))
    } 
    else if(card == "Healing Potion"){
      deckArr.push(new CardHeal(card, 'Restore 4 health', './assets/red-potion.png', id, 4))
    } 
    else if(card == "Read Pages"){
      deckArr.push(new CardDraw(card, 'Draw 2 cards', './assets/blue-book.png', id, 2))
    } 
    else if(card == "Stow Away"){
      deckArr.push(new StowAway(card, 'Deal 1 damage <br> Mill 1 card', './assets/closed-book.png', id))
    }
    else if(card == "That was a good book"){
      deckArr.push(new DiscardDamage(card, 'Deal 1 damage for each card in discard', './assets/get-your-reading-on.png', id))
    }
    else if(card == "Want to Read"){
      deckArr.push(new DeckDamage(card, 'Deal 1 damage for each card in deck', './assets/standing-books.png', id))
    }

    id++
  })

  return deckArr
}

// Getting the starting deck
deckArr = createStartingDeck()

// Shuffle the deck
deckArr = shuffle(deckArr)

// Array for cards in discard pile
let discardArr = []