// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')

class Card {
    constructor(name, text, src, id) {
        this.name = name
        this.text = text
        this.src = src
        this.id = id
    }
}

// Function to shuffle an array
const shuffle = (arr) => { 
  return arr.sort(() => Math.random() - 0.5); 
}; 

// Empty deck
let deckArr = []

// Filling the deck
let deck_size = 10
for(let id=0; id<deck_size; id++){
  if (id < deck_size*0.7){
    deckArr.push(new Card("Sword", 'Deal 2 damage', './assets/sword.png', id))
  }else if(id < deck_size*0.9){
    deckArr.push(new Card("Tea", 'Restore 3 health', './assets/tea.png', id))
  }
  else {
    deckArr.push(new Card("Healing Potion", 'Restore 6 health', './assets/potion.png', id))
  }
}


// Shuffle the deck
deckArr = shuffle(deckArr)

let discardArr = []

// Draw cards
let handArr = deckArr.slice(0, 5)

// Removes cards from deck that was drawn 
deckArr = deckArr.filter(card => !handArr.find(rm => (rm.id == card.id)))



myHandEl.innerHTML = ""

handArr.forEach(card => {
    myHandEl.innerHTML += `
    <div class="card" draggable="true">
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

const cardEls = document.querySelectorAll('.card')
const middleEl = document.querySelector('.middle')

cardEls.forEach(card => {
  card.addEventListener('dragstart', dragStart)
  card.addEventListener('dragend', dragEnd)
})

middleEl.addEventListener('dragover', dragOver)
middleEl.addEventListener('dragenter', dragEnter)
middleEl.addEventListener('dragleave', dragLeave)
middleEl.addEventListener('drop', dragDrop)


let dragged = null

// Drag Functions
function dragStart(e){
  //console.log("Start")

  dragged = e.target
  this.classList.add('hold')
}

function dragEnd(){
  //console.log("End")
  this.classList.remove('hold')
}

function dragOver(e){
  //console.log('over')
  e.preventDefault()
}

function dragEnter(e){
  //console.log('enter')
  e.preventDefault()
}

function dragLeave(){
  //console.log('leave')
}

function dragDrop(e){
  //console.log('drop')
  if (e.target.className === "middle") {
    let id = dragged.children[0].id
    console.log(dragged)
    
    // Add card to discard
    discardArr.push(handArr.find((card) => card.id == id))

    // Remove card from hand
    handArr = handArr.filter((card) => card.id != id)
    dragged.parentNode.removeChild(dragged);
    //console.log(discardArr)
  }
}