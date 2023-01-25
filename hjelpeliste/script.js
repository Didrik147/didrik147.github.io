collectionName = "help"

function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("todo-input");

    //console.log(text);

    db.collection(collectionName).add({
        text: text.value,
        status: "active",
        time: Date.now()
    })

    text.value = "";

}


function getItems() {
    //db.collection(collectionName).onSnapshot((snapshot) => {
    db.collection(collectionName).orderBy("time").onSnapshot((snapshot) => {
        //console.log(snapshot);
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items) {

    let itemsHTML = "";

    items.forEach((item) => {
        let text = item.text
        text = text.replace('>', '')
        text = text.replace('<', '')
        console.log(text)
        itemsHTML += `
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                    <i class="fa fa-check"></i>
                </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
                ${text}
            </div>
            <div class="trash">
                <div data-id="${item.id}" class="trash-mark">
                    <i class="fa fa-trash"></i>
                </div>
            </div>
        </div>
        `
    })

    document.querySelector(".todo-items").innerHTML = itemsHTML;

    createEventListeners();
}




function createEventListeners() {
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach((checkMark) => {
        //console.log(checkMark);

        checkMark.addEventListener("click", function () {
            markCompleted(checkMark.dataset.id);
        })
    })

    let todoTrashMarks = document.querySelectorAll(".todo-item .trash-mark");

    todoTrashMarks.forEach((trashMark) => {
        //console.log(trashMark);

        trashMark.addEventListener("click", function () {
            deleteTask(trashMark.dataset.id);
        })
    })
}

function deleteTask(id) {
    //console.log(id);

    let item = db.collection(collectionName).doc(id);

    item.get().then(function (doc) {
        if (doc.exists) {
            //console.log('Here is the doc', doc.data());
            item.delete();
            }
        })
}

function markCompleted(id) {
    //console.log(id);
    //console.log("Mark completed");
    // From a database
    let item = db.collection(collectionName).doc(id);

    item.get().then(function (doc) {
        if (doc.exists) {
            //console.log('Here is the doc', doc.data());
            let status = doc.data().status;

            if (status == "active") {
                item.update({
                    status: "completed"
                })
                //item.delete(); //delete element after being completed

            } else if (status == "completed") {
                item.update({
                    status: "active"
                })
            }
        }
    })
}


getItems();