const selectEl = document.querySelector("select")
const inputEl = document.querySelector("input")

const myID = 93196 // My MetrixID


class Course {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    async getRating(result) {
        const response = await fetch(`https://discgolfmetrix.com/api.php?content=course&id=${this.id}&code=${myID}`)
        //console.log(response.ok)

        const data = await response.json();
        //console.log(data)

        const course = data["course"]
        //console.log(course)

        const baskets = data["baskets"]
        let totPar = 0
        baskets.forEach((basket) => {
            totPar += Number(basket["Par"])
        })

        this.par = totPar

        let ratVal1 = Number(course["RatingValue1"])
        let ratVal2 = Number(course["RatingValue2"])
        let ratRes1 = Number(course["RatingResult1"])
        let ratRes2 = Number(course["RatingResult2"])



        let myRating = Math.round((ratVal2 - ratVal1) * (result - ratRes1) / (ratRes2 - ratRes1) + ratVal1)

        let parRating = Math.round((ratVal2 - ratVal1) * (totPar - ratRes1) / (ratRes2 - ratRes1) + ratVal1)

        let ratingArr = [parRating, myRating]

        //console.log(ratingArr)

        //console.log(Math.round(rating))
        //return Math.round(rating)
        return ratingArr
    }
}


//let courseID = 23475 // Myrdammen
//let courseID = 28110 // Ekeberg 2022

let Ekeberg = new Course("Ekeberg", "28110")
let Myrdammen = new Course("Myrdammen", "23475")
let Roa = new Course("Røa", "23654")
let KrokholGold = new Course("Krokhol Gold", "14647")
let KrokholBlue = new Course("Krokhol Blue", "24362")
let Varingskollen = new Course("Varingskollen", "18879")
let Holmenkollen = new Course("Holmenkollen", "4851")
let Langhus = new Course("Langhus", "25348")
let Nesodden = new Course("Nesodden", "23357")
let Raadhusparken = new Course("Rådhusparken", "21728")

let courseArr = [Ekeberg, Roa, Holmenkollen, Langhus, Raadhusparken, Myrdammen, Nesodden, Varingskollen, KrokholGold, KrokholBlue]

selectEl.innerHTML = ''

courseArr.forEach(course => {
    selectEl.innerHTML += `
    <option value="${course.name}">${course.name}</option>
    `
})


const parDivEl = document.querySelector("#pardiv")
const ratingDivEl = document.querySelector("#ratingdiv")


selectEl.addEventListener("change", getCourse)

function getCourse() {
    //console.log(selectEl.value)
    let course = courseArr.filter(obj => {
        return obj.name === selectEl.value
    })[0]

    //console.log(course)

    let kast = Number(inputEl.value)
    //console.log(inputEl.value)

    let promise = course.getRating(kast)


    promise.then((ratingArr) => {
        parDivEl.innerHTML = `
            <p>Ratingen for par (${course.par} kast) på denne banen er ${ratingArr[0]}.</p>
        `
        let diff;
        if (kast > course.par){
            diff = `+${kast-course.par}`
        }else if(kast < course.par){
            diff = `${kast-course.par}`
        }else {
            diff = "E"
        }

        ratingDivEl.innerHTML = `
            <p>${kast} kast (${diff}) gir en ratingen på ${ratingArr[1]}.</p>
        `
    })
}

getCourse()

inputEl.addEventListener("change", getCourse)


