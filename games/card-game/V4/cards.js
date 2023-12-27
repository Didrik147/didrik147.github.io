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
  }
}

class CardDraw extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
  }

  play() {
    console.log(this.text)
    drawCard()
  }
}

class CardDamage extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
  }

  play() {
    console.log(this.text)
    dealDamage(2, enemy)
  }
}
class CardHeal extends Card {
  constructor(name, text, src, id) {
    super(name, text, src, id)
  }

  play() {
    console.log(this.text)
    player.heal(3)
  }
}


function dealDamage(dmg, enemy) {
  console.log("Enemy lost " + dmg + " health")
  enemy.currentHealth -= dmg

  checkEnemyDeath(enemy)
}
