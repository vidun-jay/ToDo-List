//define elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//names for symbols
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const STRIKETHROUGH = "lineThrough"

//display date
const today = new Date()
const options = { weekday: "long", month: "short", day: "numeric" }

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//add task method
function addToDo(toDo) {
    const item = `<li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="0"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="0"></i>
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
            addToDo(toDo);
        }
    }
})