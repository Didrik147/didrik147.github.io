const mainEl = document.querySelector("main")
const headerEl = document.querySelector("header")
const footerEl = document.querySelector("footer")

const putterInputEl = document.querySelector("#putterinput")
const fromInputEl = document.querySelector("#frominput")
const toInputEl = document.querySelector("#toinput")
const inputEls = document.querySelectorAll("input")

const startBtn = document.querySelector("#start")
const submitBtn = document.querySelector("#submit")

let distance_from;
let distance_to;
let nPutters;

function updateMain() {
    //console.log("Updating HTML")
    mainEl.innerHTML = ""
    if (fromInputEl.value == ''){
        distance_from = Number(fromInputEl.placeholder)
    }else {
        distance_from = Number(fromInputEl.value)
    }

    if (toInputEl.value == ''){
        distance_to = Number(toInputEl.placeholder)
    }else {
        distance_to = Number(toInputEl.value)
    }
    
    for (let d = distance_from; d <= distance_to; d++) {
        mainEl.innerHTML += `
        <article>
            <h2>${d} meter</h2>
            <div class="buttonrow row${d}">
            </div>
        </article>
    `
        const buttonrowEl = document.querySelector(`.row${d}`)
        if (putterInputEl.value == ''){
            nPutters = Number(putterInputEl.placeholder)
        }else{
            nPutters = Number(putterInputEl.value)
        }
        
        for (let i = 0; i <= nPutters; i++) {
            buttonrowEl.innerHTML += `
            <button>${i}</button>
        `
        }

        let gap = 30/(nPutters*2)
        buttonrowEl.style.gap = `${gap}%`


        updateButtons()
    }
}

function updateButtons(){
    const buttonEls = document.querySelectorAll("main button")

    buttonEls.forEach(buttonEl => {
        buttonEl.addEventListener("click", clickButton)
    })

    /* Making it similar to radio button */
    function clickButton(e) {
        if (e.target.classList.contains("clicked")){
            e.target.classList.remove("clicked")
        }else {
            let row = e.target.parentElement.classList[1]

            const buttonsInRow = document.querySelectorAll(`.${row} > button`)

            buttonsInRow.forEach(buttonEl => {
                buttonEl.classList.remove("clicked")
            })
            e.target.classList.add("clicked")
        }
    }
}


startBtn.addEventListener("click", startGame)

function startGame(){
    headerEl.innerHTML = `
    <h1>POTTIS POTTIS POW POW</h1>
    <p>For each distance, press the button that corresponds to the number of putters that went inn.</p>
    <p>You can skip a distance by leaving it blank.</p>
    `
    updateMain()
    startBtn.classList.toggle('hide')
    submitBtn.classList.toggle('hide')
}


submitBtn.addEventListener('click', submitData)

function submitData(){
    console.log('Results')
    for (let d = distance_from; d <= distance_to; d++) {
        let nSuccess = -1
        const buttonsInRow = document.querySelectorAll(`.row${d} > button`)
        buttonsInRow.forEach(buttonEl => {
            if(buttonEl.classList.contains('clicked')){
                nSuccess = Number(buttonEl.innerHTML)
            }
        })
        if (nSuccess >= 0){
            console.log(`${d} m: ${nSuccess}/${nPutters}`)
        }
    }

    headerEl.innerHTML = '<h1>POTTIS POTTIS POW POW</h1>'
    mainEl.innerHTML = '<h2 class="center">Data sent</h2>'
    footerEl.innerHTML = '<button onclick="location.reload()">Try again?</button>'

    console.log('')
}