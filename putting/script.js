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
    if (fromInputEl.value == '') {
        distance_from = Number(fromInputEl.placeholder)
    } else {
        distance_from = Number(fromInputEl.value)
    }

    if (toInputEl.value == '') {
        distance_to = Number(toInputEl.placeholder)
    } else {
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
        if (putterInputEl.value == '') {
            nPutters = Number(putterInputEl.placeholder)
        } else {
            nPutters = Number(putterInputEl.value)
        }

        for (let i = 0; i <= nPutters; i++) {
            buttonrowEl.innerHTML += `
            <button>${i}</button>
        `
        }

        let gap = 30 / (nPutters * 2)
        buttonrowEl.style.gap = `${gap}%`


        updateButtons()
    }
}

function updateButtons() {
    const buttonEls = document.querySelectorAll("main button")

    buttonEls.forEach(buttonEl => {
        buttonEl.addEventListener("click", clickButton)
    })

    /* Making it similar to radio button */
    function clickButton(e) {
        if (e.target.classList.contains("clicked")) {
            e.target.classList.remove("clicked")
        } else {
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

function startGame() {
    headerEl.innerHTML = `
    <h1>POTTIS POTTIS POW POW</h1>
    <p>For each distance, press the button that corresponds to the number of putters that went inn.</p>
    <p>You can skip a distance by leaving it blank.</p>
    `

    // Play sound
    //document.getElementById('pottis').play();

    updateMain()
    startBtn.classList.toggle('hide')
    submitBtn.classList.toggle('hide')
}


submitBtn.addEventListener('click', submitData)

function submitData() {
    console.log('Logging results')

    let C1X_made = 0
    let C1X_tried = 0

    let data = {}
    for (let d = distance_from; d <= distance_to; d++) {
        let nSuccess = -1
        const buttonsInRow = document.querySelectorAll(`.row${d} > button`)
        buttonsInRow.forEach(buttonEl => {
            if (buttonEl.classList.contains('clicked')) {
                nSuccess = Number(buttonEl.innerHTML)
            }
        })
        if (nSuccess >= 0) {
            data[`${d}m`] = [nSuccess, nPutters]

            if (d > 3.3 && d < 10) {
                C1X_made += nSuccess
                C1X_tried += nPutters
            }
            console.log(`${d} m: ${nSuccess}/${nPutters}`)
        }
    }

    C1X_percentage = 100 * (C1X_made / C1X_tried)
    C1X_percentage = Math.round(C1X_percentage * 10) / 10

    headerEl.innerHTML = '<h1>POTTIS POTTIS POW POW</h1>'

    mainEl.innerHTML = '<h2 class="center">Data sent</h2>'
    mainEl.innerHTML += `<h3 class="center">C1X percentage: ${C1X_percentage} %</h3>`

    drawChart(C1X_percentage)

    mainEl.innerHTML += `<br>`

    footerEl.innerHTML = '<button onclick="location.reload()">Try again?</button>'

    //console.log(data)
}



function drawChart(p) {
    document.querySelector('.chart-container').classList.remove('hide')

    let ctx = document.getElementById('myChart').getContext('2d');
    let labels = ['Putt made', 'Putts missed']
    let colorHex = ['#43AA8B', '#FB3640']

    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [p, 100-p],
                backgroundColor: colorHex
            }],
            labels: labels
        },
        options: {
            responsive: true,
            /* rotation: 45, */
            legend: {
                position: 'bottom',
                onClick: null,
                reverse: true,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: 'percentage',

                    // precision for percentage, default is 0
                    precision: 0,

                    // identifies whether or not labels of value 0 are displayed, default is false
                    showZero: true,

                    // font size, default is defaultFontSize
                    fontSize: 20,

                    // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                    fontColor: '#fff',

                    // draw text shadows under labels, default is false
                    textShadow: true,

                    // text shadow intensity, default is 6
                    shadowBlur: 10,

                    // text shadow X offset, default is 3
                    shadowOffsetX: 0,

                    // text shadow Y offset, default is 3
                    shadowOffsetY: 0,

                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: 'rgba(0,0,0,1)',


                    // position to draw label, available value is 'default', 'border' and 'outside'
                    // bar chart ignores this
                    // default is 'default'
                    position: 'default',

                    // draw label even it's overlap, default is true
                    // bar chart ignores this
                    overlap: true,
                }
            }
        }
    })
}