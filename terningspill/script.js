let terningerEl = document.querySelector(".terninger");
let remaining = 4;


// Funksjon gir gir et tall mellom 1 og 6
function terning(){
    return Math.floor(Math.random()*6) + 1;
}

// Variabel som holder styr på et enkelt kast
let k;

// Legger til lyttere på terningene
function addClickEvent(){
    let terningAll = document.querySelectorAll(".terning");

    terningAll.forEach(terning => {
        terning.addEventListener('click', (e) => {
            terning.classList.toggle('chosen');
        })
    })
}

// Funksjon som ruller alle terningene
function rollAllDice(){
    terningerEl.innerHTML = "";
    showDice(5)

    addClickEvent();
    calculateSum();
}

// Funksjon som viser n terninger
function showDice(n){
    for (let i = 1; i <= n; i++) {
        k = terning()
        /* Bildene av terninger er laget selv i Inkscape */
        terningerEl.innerHTML += `
            <div class="terning" id="terning${k}">
                <img src="./terninger/die-${k}.svg" id="${k}">
            </div>
        `
    }
}

// Funksjon som ruller terningene som ikke er valgt
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

    showDice(n)

    addClickEvent();
    calculateSum();
}


// Regner ut summen av totalt antall øyne
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