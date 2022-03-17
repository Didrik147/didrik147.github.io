// Lager variabler basert på DOM
let minEl = document.querySelector('#min')
let maxEl = document.querySelector('#max')
let topEl = document.querySelector('#top')
let btnEl = document.querySelector("#btn")
let HaraldEl = document.querySelector('.Harald')

// Lager et array med heltall fra og med low til og med high
function nArray(low, high){
    let i = low;
    arr = [i]
    while (i < high){
        i++;
        arr.push(i)
    }

    return arr
}

// Ansatt klasse
class Ansatt{
    constructor(name, low, high, hasImage=false){
        this.name = name
        this.numbers = nArray(low, high)
        this.hasImage = hasImage
    }
}


// Lager objekter av de ansatte, og legger i et array 
// For ansatte som har gitt samtykke, brukes ansattfoto
let ansatte = []
ansatte.push(new Ansatt("Asbjørn", 1, 12))
ansatte.push(new Ansatt("Tore", 13, 24))
ansatte.push(new Ansatt("Mari K. K.", 25, 30, true))
ansatte.push(new Ansatt("Kirsti", 31, 36))
ansatte.push(new Ansatt("Mari K. K.", 37, 42, true))
ansatte.push(new Ansatt("Johanne", 43, 47))
ansatte.push(new Ansatt("Kristin", 48, 59))
ansatte.push(new Ansatt("Kirsti", 60, 65))
ansatte.push(new Ansatt("Johanne", 66, 69))
ansatte.push(new Ansatt("Thomas R.", 70, 81))
ansatte.push(new Ansatt("Johanne", 82, 84))
ansatte.push(new Ansatt("Harald", 85, 96, true))
ansatte.push(new Ansatt("Otto A.", 97, 108))
ansatte.push(new Ansatt("Anders H.", 109, 120, true))
ansatte.push(new Ansatt("Mira", 121, 132))
ansatte.push(new Ansatt("Turid", 133, 144))
ansatte.push(new Ansatt("Didrik", 145, 149, true)) // meg selv
ansatte.push(new Ansatt("Vegard", 150, 161))


// Velger hvilket bilde av Harald som skal brukes basert på vindusbredde
window.addEventListener('resize', setHarald);
window.addEventListener('load', setHarald);

function setHarald(){
    if (window.innerWidth <= 650) {
        /* Bildet er hentet fra Viken fylkeskommune */
        HaraldEl.src = "./bilder/ansatte/Harald.jpg"
    }
    else {
        /* Bilde er hentet fra: https://www.budstikka.no/debatt/la-biblioteket-leve/25958!/ */
        HaraldEl.src = "./bilder/Harald_bibliotek.jpg"
    }
}



topNumberEl = document.querySelector('#topNumber')

// Lyd
let audio = new Audio('drumroll_tada.mp3');
audio.load()

// Lager et tilfeldig heltall fra og med min til og med max
function tilfeldigTall(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Trekker ansatt
function tilfeldigTrekk(){
    audio.load()
    let min = Number(minEl.value)
    let max = Number(maxEl.value)

    btnEl.classList.toggle("trukket")
    
    if (btnEl.classList.contains("trukket")) {
        audio.play();
        let tilfeldig = tilfeldigTall(min, max)
        let navn = "";
        let harBilde = false;
        ansatte.forEach(ansatt => {
            if(ansatt.numbers.includes(tilfeldig)){
                navn = ansatt.name
                harBilde = ansatt.hasImage
            }
        })
        
        HaraldEl.classList.toggle("zoom")
        HaraldEl.style.height = '0';
        
        topNumberEl.innerHTML = `<p>${tilfeldig}</p>`

        if (navn != ""){
            topNumberEl.innerHTML += `<p>(${navn})</p>`

            if(harBilde){
                topNumberEl.innerHTML += `<img src="./bilder/ansatte/${navn}.jpg" alt="${navn}">`
            }

            topNumberEl.style.fontSize = "60px"            
        }
        else {
            topNumberEl.style.fontSize = "120px" 
        }

        btnEl.innerText = "Igjen?"
    } else {
        btnEl.innerText = "Trekk!"
        
        HaraldEl.classList.toggle("zoom")
        HaraldEl.style.height = '95%'
        topNumberEl.innerText = "0"
    }
    
}