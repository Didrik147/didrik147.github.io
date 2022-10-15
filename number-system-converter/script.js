const convertBtn = document.querySelector("#convert")
const swapBtn = document.querySelector("#swap")

const fromEl = document.querySelector("#from")
const toEl = document.querySelector("#to")
const numberinputEl = document.querySelector("#numberinput")
const resultEl = document.querySelector("#result")

const baseEl = document.querySelector("#base")

convertBtn.addEventListener("click", convert)

swapBtn.addEventListener("click", swapBase)

fromEl.addEventListener("change", changeBase)

labelEl = document.querySelector('label[for=numberinput]')


let baseObject = {
    "Decimal" : 10,
    "Binary" : 2,
    "Hexadecimal" : 16
}

function changeBase(){
    baseEl.innerHTML = baseObject[fromEl.value]
    labelEl.innerHTML = `Enter a ${fromEl.value.toLowerCase()} number:`
}

/* Run changeBase function, in case other than binary is selected as default */
changeBase()


function swapBase(){
    let temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;

    changeBase()
}


/* Return true if only digits, otherwise false */
function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
}



function convert(){
    /* console.log(fromEl.value)
    console.log(toEl.value) */

    /* Empty output */
    if(numberinputEl.value == ""){
        resultEl.innerHTML = "Please write a number"
        return
    }

    if (Number(numberinputEl.value) < 0) {
        resultEl.innerHTML = "Please write a non-negative number"
        return
    }

    /* Same from and to */
    if(fromEl.value === toEl.value){
        resultEl.innerHTML = "Choose different 'from' and 'to'"
    
    /* From binary */
    }else if (fromEl.value === "Binary"){
        let bin = numberinputEl.value.replace(/\s+/g, '');

        /* From binary to decimal */
        if(toEl.value === "Decimal"){
            let dec = bin2dec(bin)
            resultEl.innerHTML = `(${bin})${sub(2)} = (${dec})${sub(10)} `

        /* From binary to hexadecimal */
        }else if(toEl.value == "Hexadecimal"){
            let dec = bin2dec(bin)
            let hex = dec2hex(dec)
            resultEl.innerHTML = `(${bin})${sub(2)} = (${hex})${sub(16)} `

        }else {
            resultEl.innerHTML = `Not yet implemented`
        }
    
    /* From decimal */
    } else if (fromEl.value === "Decimal"){
        let dec = numberinputEl.value.replace(/\s+/g, '');
        /* console.log("From decimal") */

        if(!onlyNumbers(numberinputEl.value)){
            resultEl.innerHTML = 'Input can only be numbers'
            return
        }

        /* From decimal to binary */
        if(toEl.value === "Binary"){
            /* console.log("To binary") */
            let bin = dec2bin(dec)
            resultEl.innerHTML = `(${dec})${sub(10)} = (${bin})${sub(2)} `
        
        /* From decimal to hexadecimal */
        } else if (toEl.value === "Hexadecimal"){
            /* console.log("To hexadecimal") */
            
            let hex = dec2hex(dec)
            resultEl.innerHTML = `(${dec})${sub(10)} = (${hex})${sub(16)}`
        }

    /* From hexadecimal */
    }else if (fromEl.value === "Hexadecimal"){
        let hex = numberinputEl.value.replace(/\s+/g, '');

        if(toEl.value === "Decimal"){
            let dec = hex2dec(hex)
            resultEl.innerHTML = `(${hex})${sub(16)} = (${dec})${sub(10)} `

        }else if(toEl.value === "Binary"){
            let dec = hex2dec(hex)
            let bin = dec2bin(dec)
            resultEl.innerHTML = `(${hex})${sub(16)} = (${bin})${sub(2)}`

        }else {
            resultEl.innerHTML = `Not yet implemented`
        }
    }
}



function sub(number){
    number = String(number)
    let L = number.length
    let output = ""

    for(let digit of number){
        output += `&#832${digit};`
    }

    return output
    
}



/* Function that converts binary number to decimal number */
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

    return dec
}

/* Function that finds the biggest value in an array */
function max(arr) {
    return arr.reduce((a, b) => Math.max(a, b), -Infinity);
}

/* Function that converts decimal number to binary number */
function dec2bin(dec) {
    let bin = "";
    let d = dec
    let arr = []

    if (d == 0) {
        bin = "0"
        return bin
    }

    while (d != 0) {
        let e = Math.floor(Math.log2(d))
        let p = 2 ** e
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

    return bin
}


const hex2decObject = {
    "0" : 0,
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "a" : 10,
    "b" : 11,
    "c" : 12,
    "d" : 13,
    "e" : 14,
    "f" : 15
}

const dec2hexObject = {
    "0" : "0",
    "1" : "1",
    "2" : "2",
    "3" : "3",
    "4" : "4",
    "5" : "5",
    "6" : "6",
    "7" : "7",
    "8" : "8",
    "9" : "9",
    "10" : "a",
    "11" : "b",
    "12" : "c",
    "13" : "d",
    "14" : "e",
    "15" : "f"
}

/* Function that converts hexadecimal number to decimal number */
function hex2dec(hex){
    let dec = 0;
    hex = hex.toLowerCase()
    let N = hex.length;

    for(let i=0; i<N; i++){
        let h = hex[N-i-1]

        dec += hex2decObject[h]*16**i
    }

    return dec
}

/* Logarithm with base 16 */
function log16(x){
    return Math.log(x)/Math.log(16)
}

/* Function that converts decimal number to hexadecimal number */
function dec2hex(dec) {
    let hex = ""

    let d = dec
    let arr = []

    if (d == 0) {
        hex = "0"
        return hex
    }

    while (d != 0) {
        let e = Math.floor(log16(d))
        let p = 16 ** e
        arr.push(p)
        d -= p
    }

    /* console.log(arr) */
    let count = {}

    let m = max(arr)
    
    /* Using a for-loop to avoid an infinite while-loop */
    /* Should be a big enough number to avoid any problems*/
    for(let i=0; i<15; i++){
        count[16**i] = 0
        if (16**i == m){
            break
        }
    }

    /* console.log(count) */

    for (let element of arr){
        if (count[element]){
            count[element] += 1;
        }else {
            count[element] = 1;
        }
    }

    /* console.log(count) */

    /* Making array with reverse key order */
    const reversedKeys = Object.keys(count).reverse();

    reversedKeys.forEach(key => {
        hex += dec2hexObject[count[key]]
    })

    return hex
}
