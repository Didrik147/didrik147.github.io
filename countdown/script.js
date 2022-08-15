let countdowndivEl = document.querySelector("#countdowndiv")
let timertextEl = document.querySelector("#timertext")
let initialtimeEl = document.querySelector("#initialtime")
let countdowninputEl = document.querySelector("#countdowninput")
let startBtn = document.querySelector("#start")
let resetBtn = document.querySelector("#reset")



// Deklarerer globale varibler
let totalSec;
let run;
let startHour;
let startMin;
let startSec;

let cd = setInterval(countdown, 1000)

countdowninputEl.addEventListener("change", getTime)
startBtn.addEventListener("click", startTimer)
resetBtn.addEventListener("click", resetTimer)

resetTimer() // nullstimmer timeren



function getTime(){
    let initialTimer = countdowninputEl.value
    hourStr = initialTimer.slice(0,2)
    minStr = initialTimer.slice(3,5)
    secStr = initialTimer.slice(6,8)

    startHour = Number(hourStr)
    startMin = Number(minStr)
    startSec = Number(secStr)

    totalSec = startHour *3600 + startMin*60 + startSec
    //console.log(totalSec)

    //timertextEl.innerText = `${hourStr}:${minStr}:${secStr}`
}



function startTimer(){
    initialtimeEl.style = "display: none"
    countdowndivEl.style = "display: block"  

    if (!run) {
        run = true
        console.log("Start")

        startBtn.innerHTML = "Pause"
        startBtn.classList.toggle("start")
    } else {
        run = false
        console.log("Pause")
        startBtn.innerHTML = "Resume"
        startBtn.classList.toggle("start")
    }

      
}


function resetTimer(){
    startBtn.style = "display: flex;"
    timertextEl.innerText = "..."

    console.log("Resetting")
    initialtimeEl.style = "display: block"
    countdowndivEl.style = "display: none"

    startBtn.innerHTML = "Start"
    if(run){
        startBtn.classList.toggle("start")
    }
    

    run = false
    getTime() // henter tiden fra input
}


// Function to countdown the number of seconds
function countdown() {
    if (run) {
        output = sec2time(totalSec)
        timertextEl.innerHTML = output

        if(totalSec == 0){
            // Legg til lydeffekter
            console.log("Tiden er ute!")
            startBtn.style="display: none;"
            run = false
        }
        totalSec--
        
    }
}


function sec2time(total){
    let hour = Math.floor(total/3600)
    total -= hour*3600

    let min = Math.floor(total/60)
    total -= min*60

    let sec = total

    let hourStr = String(hour).padStart(2, '0')
    let minStr = String(min).padStart(2, '0')
    let secStr = String(sec).padStart(2, '0')

    output = `${hourStr}:${minStr}:${secStr}`

    return output
}
