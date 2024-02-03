const fromDateEl = document.querySelector("#start_date")
const toDateEl = document.querySelector("#end_date")
const resultatEl = document.querySelector("#resultat")

fromDateEl.addEventListener("change", findDays)
toDateEl.addEventListener("change", findDays)

function findDays(){
    let startDate = new Date(fromDateEl.value)
    let endDate = new Date(toDateEl.value)

    // Seconds
    let time = endDate - startDate

    let days = Math.floor(time/(1000*3600*24))
    
    if (!isNaN(days)){
        resultatEl.innerHTML = `Det er ${days} dager mellom disse to datoene.`
    }
}

