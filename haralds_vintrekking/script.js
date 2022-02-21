let minEl = document.querySelector('#min')
let maxEl = document.querySelector('#max')

let topEl = document.querySelector('#top')

let btnEl = document.querySelector("#btn")

let imgEl = document.querySelector('.Harald')


window.addEventListener('resize', () => {
    if (window.innerWidth <= 650) {
        imgEl.src = "Harald.jpg"
    }
    else {
        imgEl.src = "Harald_bibliotek.jpg"
    }
});



topNumberEl = document.querySelector('#topNumber')

let audio = new Audio('drumroll_tada.mp3');

function tilfeldigTall(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function tilfeldigTrekk(){
    let min = Number(minEl.value)
    let max = Number(maxEl.value)

    btnEl.classList.toggle("trukket")

    if (btnEl.classList.contains("trukket")) {
        let tilfeldig = Math.floor(Math.random() * (max - min + 1)) + min

        audio.play();
        imgEl.classList.toggle("zoom")
        imgEl.style.height = '0';
        

        topNumberEl.innerText = tilfeldig
        btnEl.innerText = "Igjen?"
    } else {
        btnEl.innerText = "Trekk!"
        
        imgEl.classList.toggle("zoom")
        imgEl.style.height = '90%'
        topNumberEl.innerText = "0"
    }
    
}