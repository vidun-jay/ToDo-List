//define elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//names for symbols
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const STRIKETHROUGH = "lineThrough"

//task variables
let LIST = [],
    id = 0;

//get item from local storage
let data = localStorage.getItem("TODO");

//if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}

//if data is empty
else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//display date
const today = new Date()
const options = { weekday: "long", month: "short", day: "numeric" }

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//add task method
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? STRIKETHROUGH : ""

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>
                `;

    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}

//add to list if enter key pressed
document.addEventListener("keyup", function(even) {

    //if enter (keycode for enter is 13) is pressed
    if (event.keyCode == 13) {
        //toDo = the current text in input field
        const toDo = input.value;

        //if input field isn't empty
        if (toDo) {
            //call addToDo function with whatever's currently in the input field
            addToDo(toDo, id, false, false);
            //adds task object to the task list
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        //clears input value
        input.value = "";
    }
});

//complete task function
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(STRIKETHROUGH);

    //toggle completion
    LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove task function
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//listen for mouse input
list.addEventListener("click", function(event) {

    //find clicked element
    const element = event.target;
    const elementJob = element.attributes.job.value;

    //run remove or complete function
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
        //call remove function once written
    }

    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));

});