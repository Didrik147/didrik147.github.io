// DOM
const enemiesEl = document.querySelector('.enemies')
let enemyEls;
let enemyEl;


// Class for enemies
class Enemy {
  constructor(name, health, src) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = health

    this.src = src
  }

  turn() {
    if (Math.random() < 0.6) {
      console.log("Peck")
      setTimeout(() => {
        dialogBoxEl.innerHTML = `
        <p>${this.name} uses its beak to peck</p>
      `
      }, 200)
      setTimeout(() => {
        enemyDealDamage(4)
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
        enemyDealDamage(10)
        updateTopHTML()
      }, 1200)
    }
  }
}

function enemyDealDamage(dmg){
  dialogBoxEl.innerHTML += `
        <p>It deals ${dmg} damage</p>
      `
  player.currentHealth -= dmg
}


let enemies = []

crow = new Enemy("Crow", 20, './assets/crow.png')
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
    cardEls.forEach(cardEl => {
        cardEl.removeEventListener('dragstart', dragStart)
        cardEl.removeEventListener('dragend', dragEnd)
    })
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