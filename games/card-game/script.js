// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')


function randomInteger(a, b) {
    return Math.floor(Math.random() * b) + a
}

function createRandomCard() {
    let atk = randomInteger(1, 9)
    let def = randomInteger(1, 9)

    let card = {
        "name": `Random_${atk}/${def}`,
        "attack": atk,
        "defence": def,
    }

    return card
}

class Card {
    constructor(name, type, attack, defence) {
        this.name = name
        this.type = type
        this.attack = attack
        this.defence = defence
    }
}


let unicorn = {
    "name": "Unicorn",
    "type": "Beast",
    "attack": 3,
    "defence": 2
}

let evilPumpkin = {
    "name": "Evil Pumpkin",
    "type": "Plant",
    "attack": 4,
    "defence": 4
}

let didrik147 = new Card("Didrik147", 'Human', '1', '47')

let handArr = [unicorn, didrik147]
/* 
for(let i=0; i<2; i++){
    handArr.push(createRandomCard())
} */

console.log(handArr)

myHandEl.innerHTML = ""

handArr.forEach(card => {
    console.log(card)
    myHandEl.innerHTML += `
    <div class="card">
        <div class="name">
            <h2>${card.name}</h2>
        </div>
        <div class="image">
            <img src="./assets/${card.name.toLowerCase()}.png" alt="">
    </div>
    <div class="stats">
        <div class="attack">${card.attack}</div>
        <div class="defence">${card.defence}</div>
    </div>
</div>
    `
})