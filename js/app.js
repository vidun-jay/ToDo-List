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
const options = {weekday: "long", month:"short", day:"numeric"}

dateElement.innerHTML = today.toLocaleDateString("en-US", options)
