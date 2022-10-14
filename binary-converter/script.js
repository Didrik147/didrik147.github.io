const convertBtn = document.querySelector("#convert")
const swapBtn = document.querySelector("#swap")

const fromEl = document.querySelector("#from")
const toEl = document.querySelector("#to")
const numberinputEl = document.querySelector("#numberinput")
const resultEl = document.querySelector("#result")

const baseEl = document.querySelector("#base")

convertBtn.addEventListener("click", convert)

swapBtn.addEventListener("click", swap)

function swap(){
    let temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;

    if (fromEl.value === "Binary"){
        baseEl.innerHTML = "2"
        numberinputEl.value = "1101"
    }else if(fromEl.value === "Decimal"){
        baseEl.innerHTML = "10"
        numberinputEl.value = "13"
    }
}



function convert(){
    if (fromEl.value === "Binary" && toEl.value === "Decimal"){
        let bin = numberinputEl.value.replace(/\s+/g, '');
        
        bin2dec(bin)        
    } else if (fromEl.value === "Decimal" && toEl.value === "Binary"){
        let dec = numberinputEl.value.replace(/\s+/g, '');

        dec2bin(dec)
    }
}

function bin2dec(bin){
    let dec = 0;

    let N = bin.length;

    for(let i=0; i<N; i++){
        let b = bin[N - i - 1]

        if(b == "1" || b == "0"){
            dec += b * 2 ** i
        }else {
            resultEl.innerHTML = `Not correct input`
            return
        }
        
    }

    resultEl.innerHTML = `(${bin})₂ = (${dec})₁₀`
}


function max(arr){
    return arr.reduce((a, b) => Math.max(a, b), -Infinity);
}


function dec2bin(dec){
    let bin = "";
    let d = dec
    let arr = []

    if (d==0){
        bin = "0"
    }

    while (d != 0) {
        let e = Math.floor(Math.log2(d))
        let p = 2**e
        arr.push(p)
        d -= p
    }

    let m = max(arr)

    for (let i = Math.floor(Math.log2(m)); i >= 0; i--) {
        if (arr.includes(2 ** i)) {
            bin += "1"
        } else {
            bin += "0"
        }
    }

    resultEl.innerHTML = `(${dec})₁₀ = (${bin})₂`
}
