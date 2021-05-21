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

//get data from local storage
let data = localStorage.getItem("TODO");

//create date object
const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };

//load saved list
function loadList(array) {
    //for each item in the list, pass the attributes of the item to the addToDo function
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//add task method
function addToDo(toDo, id, done, trash) {
    //checks if the task has been trashed or completed
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? STRIKETHROUGH : "";
    //defines list item to be added
    const item = `<li class="item">
                    <span style="color: White;">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    </span>
                    <p class="text ${LINE}">${toDo}</p>
                    <span style="color: White;">
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                    </span>
                </li>
                `;
    //inserts item before the end of the list class
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//complete task function
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.parentNode.querySelector(".text").classList.toggle(STRIKETHROUGH);
    //toggle completion
    LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove task function
function removeToDo(element) {
    //removes todo from list
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    //sets trash value to true
    LIST[element.id].trash = true;
}

//displays current date
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//checks if data is empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//add to list if enter key pressed
document.addEventListener("keyup", function(even) {
    //if enter (keycode for enter is 13) is pressed
    if (event.keyCode == 13) {
        //toDo = the current text in input field
        const toDo = input.value;
        //if input field isn't empty
        if (toDo) {
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //call addToDo function with whatever's currently in the input field
            addToDo(toDo, id, false, false);
            //adds task object to the task list
            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
        }
        //clears input value
        input.value = "";
    }
});

//listen for mouse input on list element
list.addEventListener("click", function(event) {
    //find clicked element
    const element = event.target;
    //check if element attributes have been defined
    if (typeof element.attributes.job === "undefined") { return; }
    const elementJob = element.attributes.job.value;
    //run remove or complete function
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

//listen for mouse input on clear element
clear.addEventListener("click", function() {
    //clear local storage
    localStorage.clear();
    location.reload();
});
