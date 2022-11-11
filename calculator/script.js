const buttonEls = document.querySelectorAll("main button")

const expressionEl = document.querySelector('.expression')
const answerEl = document.querySelector('.answer')

buttonEls.forEach(buttonEl => {
    buttonEl.addEventListener('click', pressButton)
})


function equals() {
    let answer = expressionEl.value
    //console.log(answer)
    answer = answer.replaceAll("pi", "Math.PI")
    answer = answer.replaceAll("π", "Math.PI")
    answer = answer.replaceAll("exp(", "Math.exp(")
    answer = answer.replaceAll("sin(", "Math.sin(")
    answer = answer.replaceAll("lg(", "Math.log10(")
    answer = answer.replaceAll("ln(", "Math.log(")
    answer = answer.replaceAll("√(", "Math.sqrt(")
    answer = answer.replaceAll("∛(", "Math.cbrt(")
    //console.log(answer)
    answer = eval(answer)
    let n = 1E10
    //answerEl.innerText = answer
    answerEl.innerText = Math.round(answer * n) / n
}

function clear(){
    expressionEl.value = ""
    answerEl.innerText = ""
}


function pressButton(e){
    if (e.target.id == "ac"){
        clear()
    } else if (e.target.classList.contains('number')) {
        expressionEl.value += e.target.innerText
    } 
    else if (e.target.id == "plus"){
        expressionEl.value += "+"
    } else if (e.target.id == "minus"){
        expressionEl.value += "-"
    } else if (e.target.id == "multiply") {
        expressionEl.value += "*"
    } else if (e.target.id == "divide") {
        expressionEl.value += "/"
    } else if (e.target.id == "equals") {
        equals() 
    } else if (e.target.id == "del"){
        expressionEl.value = expressionEl.value.slice(0, -1)
    } else {
        expressionEl.value += e.target.innerText
    }   
}

//let valid = ["1","2","3","4","5","6","7","8","9", "0", "(", ")", "+", "-", "*", "/"]

let regex = /[A-Z\x08?]/

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    //console.log("Key:", e.key)
    //console.log("Code:", e.code)

    if (e.key == "Backspace"){
        expressionEl.value = expressionEl.value.slice(0,-1)
    } else if(e.key == "Enter") {
        equals()
    } else if (!regex.test(e.key)){
        expressionEl.value += e.key
    } else if (e.key == "e"){
        expressionEl.value += "E"
    } else if (e.key == "Escape"){
        clear()
    } else if (e.key == "." || e.key == ",") {
        expressionEl.value += "."
    }
})