let startBtn = document.querySelector("#start")
let clearBtn = document.querySelector("#clear")
let stopwatchEl = document.querySelector("#stopwatch")

startBtn.addEventListener("click", startTimer)

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    if (!e.repeat && e.code == "Space"){
        startTimer()
    }

    if (e.code == "Backspace" || e.code == "Delete") {
        clearTimer()
    }
})

clearBtn.addEventListener("click", clearTimer)

let output
let desisec
let sec
let min
let run

clearTimer()

function clearTimer(){
    console.log("Clearing")
    output = "00:00.0"
    sec = 0
    min = 0
    desisec = 0
    run = false
    stopwatchEl.innerHTML = output
    startBtn.innerHTML = "Start"
    if(!startBtn.classList.contains("start")){
        startBtn.classList.toggle("start")
    }
}

// 1000 ms is 1 second
// So 10 ms is 10/1000 = 1/100 = 0.01 s
// 10 ms = 1 cs
// 100 ms = 0.1 sec = 1 ds
let timer = setInterval(stopwatch, 100);

function startTimer(){
    if(!run){
        run = true
        console.log("Start")
        // Kaller funksjonen for hvert millisekund
        
        startBtn.innerHTML = "Pause"
        startBtn.classList.toggle("start")
    }else{
        run = false
        console.log("Pause")
        startBtn.innerHTML = "Resume"
        startBtn.classList.toggle("start")
    }
}

function stopwatch(){
    if(run){
        desisec++  //øker antall desisekunder med 1

        if(desisec == 10){
            sec++
            desisec = 0
        }
        if (sec == 60) { //hvis det har gått 60 sekunder
            min++ // øker antall minutter med 1
            sec = 0
        }

        /* if (min == 60) { //hvis det har gått 60 min
            hour++ // øker antall timer med 1
            min = 0
        } */

        let minStr = String(min).padStart(2, '0')
        let secStr = String(sec).padStart(2, '0')
        let desisecStr = String(desisec).padStart(1, '0')


        output = `${minStr}:${secStr}.${desisecStr}`
        //console.log(output)

        stopwatchEl.innerHTML = output
    }   
}