// Get elements from DOM
const myHandEl = document.querySelector('.my-hand')
const endTurnBtn = document.querySelector('.end-turn')
const middleEl = document.querySelector('.middle')
const topEl = document.querySelector('.top')
const deckEl = document.querySelector('.deck')
const discardPileEl = document.querySelector('.discard-pile')
const dialogBoxEl = document.querySelector('.dialog-box')


// Room number is saved in localStorage
let roomNumber = 1

if (!localStorage.roomNumber) {
  localStorage.roomNumber = 1
} else {
  roomNumber = Number(localStorage.roomNumber)
}

function nextRoom() {
  roomNumber += 1

  if (roomNumber < 3) {
    localStorage.roomNumber = roomNumber
    location.reload()
  } else {
    middleEl.classList.add('flex')
    middleEl.innerHTML = `
        <h2>You won!</h2>
        <button onClick='nextRoom()'>Try again?</button>
      `
    endTurnBtn.style.display = 'none'
    roomNumber = 0
    localStorage.roomNumber = roomNumber
  }


}
