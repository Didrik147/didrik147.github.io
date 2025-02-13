// DOM
const enemiesEl = document.querySelector('.enemies')
let enemyEls;
let enemyEl;
let currentHealthEl;


// Class for enemies
class Enemy {
  constructor(name, health, src) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = health

    this.src = src
  }

  turn() {
    console.log("Enemy turn")
  }
}

class Crow extends Enemy {
  constructor(name, health, src) {
    super(name, health, src)
  }

  turn() {
    if (Math.random() < 0.7) {
      console.log("Peck")
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} uses its beak to peck</p>
      `
      }, 200)
      setTimeout(() => {
        enemyDealDamage(3)
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
        enemyDealDamage(7)
        updateTopHTML()
      }, 1200)
    }
  }
}

class Owl extends Enemy {
  constructor(name, health, src) {
    super(name, health, src)
  }

  turn() {
    if (Math.random() < 0.6) {
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} uses its beak to peck</p>
      `
      }, 200)
      setTimeout(() => {
        enemyDealDamage(5)
        updateTopHTML()
      }, 1200)

    } else {
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} looks at you with scary eyes</p>
      `
      }, 200)
      setTimeout(() => {
        enemyDealDamage(8)
        updateTopHTML()
      }, 1200)
    }
  }
}


function enemyDealDamage(dmg) {
  dialogBoxEl.innerHTML += `
        <p>It deals ${dmg} damage</p>
      `
  player.currentHealth -= dmg
}



let possibleEnemies = [
  new Crow("Crow", 10, './assets/crow.png'),
  new Owl("Owl", 20, './assets/owl.png'),
]

let enemies = []
enemies.push(possibleEnemies[roomNumber-1])

let enemy = enemies[0]

function updateEnemiesHTML() {
  enemiesEl.innerHTML = ""

  enemies.forEach(enemy => {
    enemiesEl.innerHTML += `
      <div class='enemy'>
      <div class='health-bar'>
          <div class='current-health'></div>
        </div>
        <img src='${enemy.src}'>
      </div>
    `
  })

  enemyEls = document.querySelectorAll('.enemy')
  enemyEl = enemyEls[0]
  currentHealthEl = document.querySelector('.current-health')
}

updateEnemiesHTML()




function checkEnemyDeath(enemy) {
  if (enemy.currentHealth <= 0) {
    enemyEl.classList.add('dead')
    cardEls.forEach(cardEl => {
      cardEl.removeEventListener('dragstart', dragStart)
      cardEl.removeEventListener('dragend', dragEnd)
    })
    endTurnBtn.removeEventListener('click', endTurn)

    setTimeout(() => {
      if (checkVictory()) {
        middleEl.classList.add('flex')
        middleEl.innerHTML = `
        <h2>You defeated all the enemies in this room!</h2>
        <button onClick='nextRoom()'>Next room</button>
      `
        endTurnBtn.style.display = 'none'
      }
    }, 1200)
  }
}