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
    constructor(name, color, attack, defence) {
        this.name = name
        this.color = color
        this.attack = attack
        this.defence = defence
    }
}


let unicorn = new Card("Unicorn", 'White', '3', '2')

let fire = new Card("Little Bonfire", 'Red', '5', '1')

let sassyPumpkin = new Card("Sassy Pumpkin", 'Green', '0', '8')

let handArr = [unicorn, 
    fire, 
    sassyPumpkin,
    new Card("Happy Mail", 'Blue', '1', '1')
]
/* 
for(let i=0; i<2; i++){
    handArr.push(createRandomCard())
} */

console.log(handArr)

myHandEl.innerHTML = ""

handArr.forEach(card => {
    console.log(card)
    myHandEl.innerHTML += `
    <div class="card ${card.color.toLowerCase()}">
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