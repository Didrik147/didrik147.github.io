let terningerEl = document.querySelector(".terninger");
let remaining = 4;


function terning(){
    return Math.floor(Math.random()*6) + 1;
}

let k;

function addClickEvent(){
    let terningAll = document.querySelectorAll(".terning");

    terningAll.forEach(terning => {
        terning.addEventListener('click', (e) => {
            terning.classList.toggle('chosen');
        })
    })
}

/* Bildene av terninger er hentet fra Wikipedia Commons */

function rollAllDice(){
    terningerEl.innerHTML = "";
    for (let i=1; i<=5; i++){
        k = terning()
        terningerEl.innerHTML += `
            <div class="terning" id="terning${k}">
                <img src="./terningbilder/Dice-${k}.svg" id="${k}">
            </div>
        `
    }

    addClickEvent();
    calculateSum();
}

//rollAllDice();


function rollNotChosenDice(){
    let terningAll = document.querySelectorAll(".terning");
    let n = 5;
    terningerEl.innerHTML = "";

    terningAll.forEach(terning => {
        if(terning.classList.contains('chosen')){
            n--;
            terningerEl.innerHTML += terning.outerHTML
        }
    })

    for (let i=1; i<=n; i++){
        k = terning()
        terningerEl.innerHTML += `
            <div class="terning" id="terning${k}">
                <img src="./terningbilder/Dice-${k}.svg" id="${k}">
            </div>
        `
    }

    addClickEvent();
    calculateSum();
}

// Regner ut summen av antall øyne totalt
function calculateSum(){
    let sum = 0;
    let terningBildeAll = document.querySelectorAll("img");

    terningBildeAll.forEach(terningBilde => {
        sum += Number(terningBilde.id);
    })

    let h1El = document.querySelector("#score");

    h1El.innerText = `Score: ${sum}`

    let h2El = document.querySelector("#remaining");
    remaining--;

    h2El.innerText = `Du har ${remaining} kast igjen`

    if (remaining <= 0){
        document.getElementById("knappAlle").style.display = "none";
        document.getElementById("knappValgt").style.display = "none";
    }
}


// Kaster alle terningene når nettsiden laster inn
rollAllDice()