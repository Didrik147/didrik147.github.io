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
    if (player.currentEnergy <= 0){
      setTimeout(() => {
        endTurnBtn.classList.add('finished')
      }, 200)
    }
    updateTopHTML()
  }
}

class CardDraw extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.draw = 2
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You draw ${this.draw} cards</p>`
    for (let i = 0; i < this.draw; i++) {
      setTimeout(() => {
        drawCard()
      }, i*300)
    }
  }
}

class CardDamage extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.dmg = 2
  }

  play() {
    super.play()
    dialogBoxEl.innerHTML = `<p>You dealt ${this.dmg} damage</p>`
    dealDamage(this.dmg, enemy)
  }
}
class CardHeal extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
    this.life = 3
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
  currentHealthEl.style.width = `${100*enemy.currentHealth/enemy.maxHealth}%`

  checkEnemyDeath(enemy)
}


// Function to shuffle an array
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

// Empty deck
let deckArr = []

// Filling the deck
let deck_size = 10
for (let id = 0; id < deck_size; id++) {
  if (id < deck_size * 0.3) {
    deckArr.push(new CardDamage("Sword", 'Deal 2 damage', './assets/sword.png', id))
  } else if (id < deck_size * 0.7) {
    deckArr.push(new CardDraw("Tea", 'Draw 2 cards', './assets/tea.png', id))
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