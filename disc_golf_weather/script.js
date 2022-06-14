/*
TODO
[ ] Lage en kolonne for "Tomorrow" istedenfor "In 24 hours". Ta f.eks. utgangspunkt i kl. 13 dagen etterpå
[ ] Legge til farger avhengig av verdi på f.eks. vind, nedbør og temperatur
[ ] Finne bedre måte å fikse kolonnebredde (med tanke på responsivt design)
*/

let baner = {
    "Ekeberg": [59.8951, 10.7871],
    "Røa": [59.9603, 10.6443],
    "Myrdammen": [59.8665, 11.0806],
    "Holmenkollen": [59.9658, 10.6664],
    "Nannestad": [60.2190, 11.0175],
    "Maple&nbsp;Hill": [42.2759, -71.8949],
};

// Hent navn på baner
let banerArr = Object.keys(baner)

// Velg en bane
//let banenavn = banerArr[0]

let mainEl = document.getElementById('main')
let sliderEl = document.querySelector(".slider")

let myHour = 4;

sliderEl.addEventListener("change", update)

function update(){
    mainEl.innerHTML = ""
    myHour = Number(sliderEl.value)

    getWeather(banerArr[0]) // Ekeberg
    getWeather(banerArr[1]) // Røa
    getWeather(banerArr[4]) // Nannestad
    //getWeather(banerArr[5]) // Maple Hill
}

update()


async function getWeather(banenavn) {
    let coord = baner[banenavn];
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coord[0]}&lon=${coord[1]}`;

    const res = await fetch(url);
    const data = await res.json();
    //console.log("")
    showWeather(data, banenavn);
}


let today = new Date();
let nowDate = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2,"0");
let nowTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log("Current date", nowDate)
console.log("Current time", nowTime)
console.log("")


function showWeather(data, banenavn){
    const { timeseries } = data.properties;

    let h = 0;
    let timeArr = [];
    let tempArr = [];
    let symbolArr = [];
    let preciArr = [];
    let windArr = [];

    timeseries.forEach(series => {
        //console.log(series);
        //console.log(series.time)

        let t = series.time
        //console.log(t)

        let today;

        /* Istedenfor h == 0: Ta utgangspunkt i tidspunkt nå, og hente data fra samme time som vi er i? */ 
        if (h == 0 || h == myHour || h == 24){
            //console.log(series)
            
            // Datetime
            let dt = ""

            // Date
            let date = t.slice(0,10)
            if(date == nowDate){
                //console.log("today")
                dt += "Today<br>"
                today = true
            }else {
                //console.log("tomorrow")
                dt += "Tomorrow<br>"
                today = false
            }

            // Time
            dt += t.slice(11,16)
            timeArr.push(dt)

            let data = series.data
            tempArr.push(data.instant.details.air_temperature)
            symbolArr.push(data.next_1_hours.summary.symbol_code)
            preciArr.push(data.next_1_hours.details.precipitation_amount)
            windArr.push(data.instant.details.wind_speed)
        }
        h++;
    })

    let tableEl = document.createElement('table')
    tableEl.classList.add(banenavn)

    tableEl.innerHTML = `
        <thead>
            <col style="width:40%">
            <col style="width:20%">
            <col style="width:20%">
            <tr id="row0">
                <th><h2>${banenavn}</h2></th>
                <th>${timeArr[0]}</th>
                <th>${timeArr[1]}</th>
                <th>In 24 hours</th>
            </tr>
        </thead>
        <tbody>
            <tr id="row1">
                <td>Temperature</td>
                <td>${tempArr[0]} °C</td>
                <td>${tempArr[1]} °C</td>
                <td>${tempArr[2]} °C</td>
            </tr>
            <tr id="row2">
                <td>Symbol</td>
                <td>
                    <img src="https://api.met.no/images/weathericons/svg/${symbolArr[0]}.svg" alt="${symbolArr[0]}" class="icon">
                </td>
                <td>
                    <img src="https://api.met.no/images/weathericons/svg/${symbolArr[1]}.svg" alt="${symbolArr[1]}" class="icon">
                </td>
                <td>
                    <img src="https://api.met.no/images/weathericons/svg/${symbolArr[2]}.svg" alt="${symbolArr[2]}" class="icon">
                </td>
            </tr>
            <tr id="row3">
                <td>Precipitation</td>
                <td>${preciArr[0]} mm</td>
                <td>${preciArr[1]} mm</td>
                <td>${preciArr[2]} mm</td>
            </tr>
            <tr id="row4">
                <td>Wind speed</td>
                <td>${windArr[0]} m/s</td>
                <td>${windArr[1]} m/s</td>
                <td>${windArr[2]} m/s</td>
            </tr>
        </tbody>
    </table>
        `;

    mainEl.appendChild(tableEl)
    
}

