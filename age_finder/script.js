let inputEl = document.getElementById('birthdate');
let outputEl = document.getElementById('output');

//console.log(inputEl)

inputEl.addEventListener("change", () =>{
    let bdate = inputEl.value.split('-');
    // Birthdate
    let bday = parseInt(bdate[2]);
    let bmonth = parseInt(bdate[1]);
    let byear = parseInt(bdate[0]);
    
    let birthDate = [bday, bmonth, byear]
    //console.log(birthDate)

    // Current date
    let today = new Date();

    let cday = today.getDate();
    let cmonth = today.getMonth() + 1;
    let cyear = today.getFullYear();

    let currentDate = [cday, cmonth, cyear];
    //console.log(currentDate)

    let age = calculateAge(birthDate, currentDate)

    outputEl.innerText = `${age} år`

});


function calculateAge(birthDate, currentDate){
    let bday = birthDate[0];
    let bmonth = birthDate[1];
    let byear = birthDate[2];

    let cday = currentDate[0];
    let cmonth = currentDate[1];
    let cyear = currentDate[2];
    
    let age = cyear - byear;

    // Sjekker om personen har hatt bursdag i år
    // Trekker fra 1. Hvis personen har hatt bursdag, legger til 1
    age -= 1;
    if (cmonth >= bmonth){
        if (cday >= bday){
            age += 1;
        }
    }

    if (age < 0 || age > 150){
        age = '';
    }

    return age
}