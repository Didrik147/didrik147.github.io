//Funksjon som fjerner et spesifikt element fra et array
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

let elever = [];


let textarea = document.getElementById('textarea');
textarea.focus();


function lagElevArray(input){
    let tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    elever = [];

    tags.forEach(tag => {
        elever.push(tag)
    })
    return elever
}


function lagGrupper(maksPerGruppe){
    let maksGrupper = Math.floor(elever.length/maksPerGruppe);
    let containerEl = document.querySelector("#container")
    containerEl.innerHTML = ""
    let grupper = [];
    let gruppe = [];
    let i = 0;

    //Trekker elever og legger i gruppe
    while (elever.length > 0){
        elev = elever[Math.floor(Math.random() * elever.length)]
        
        gruppe.push(elev)

        //Fjerner den trekte eleven fra arrayet
        removeItemOnce(elever, elev);
        i++;

        // Legger gruppen inn i grupper-arrayet
        if (gruppe.length == maksPerGruppe){
            grupper.push(gruppe);
            gruppe = [];
        }

        // Legger elevene som er til overs inn i de første gruppene
        if (elever.length == 0 && gruppe.length != 0){
            for (let i = 0; i < gruppe.length; i++){
                grupper[i].push(gruppe[i])
            }
        } 
        
    }

    let gruppenr = 1;
    let counter = 0;

    //Skriver til HTML
    for (let i = 0; i < maksGrupper; i++){
        // Lager div for hver gruppe
        let divEl = document.createElement('div');
        divEl.classList.add('gruppe');

        let h3El = document.createElement('h3')
        h3El.innerText = `Gruppe ${gruppenr}`;

        divEl.appendChild(h3El);
        containerEl.appendChild(divEl);
        gruppenr++;

        for (let j = 0; j<grupper[i].length; j++){
            elev = grupper[i][j]

            counter++;

            //Hver elev er et avsnitt i div-en
            let pEl = document.createElement('p');
            pEl.innerText = `- ${elev}`;
            divEl.appendChild(pEl);
        }

    }

    console.log(counter)
}


//let btnEL = document.querySelector("#btn")

//btnEL.addEventListener("click", lag);

function lag(){
    elever = lagElevArray(textarea.value)
    let tall1El = document.querySelector("#tall1")
    let maksPerGruppe = Number(tall1El.value);

    lagGrupper(maksPerGruppe)
}
