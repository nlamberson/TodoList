// ELEMENTS
// Select Elements
const clear = document.querySelector(".clear");         // Select clear button
const dateElement = document.getElementById("date");    // Select todays date
const list = document.getElementById("list");           // Get the list
const input = document.getElementById("input");         // Get the users input

// CLASSES
// Classes names
const CHECK = "fa-check-circle";        // Checked circle button
const UNCHECK = "fa-circle-thin";       // Unchecked circle button
const LINE_THROUGH = "lineThrough";     // Line through text

// VARIABLES
let LIST = []
    , id = 0;

// Get item from the local storage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;           // Set the id to the last id in the list
    loadList(LIST);             // Load the list to the user interface
} else {
    // If data isn't empty
    LIST = [];
    id = 0;
}

// Show todays date
// Gets full day of the week, short (3 letter) month, and int value of the day
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

// Set the date element to todays date string value with the above options
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// FUNCTIONS
// Add to do list function based on user input
function addToDo(toDo, id, done, trash) {
    // Check if the item is already in the trash, exit if so
    if (trash) {
        return;
    }

    // Check if the todo is not completed
    const DONE = done ? CHECK : UNCHECK;

    // Check if LINE_THROUGH is needed
    const LINE = done ? LINE_THROUGH : "";

    // Format the todolist item in HTML with the given input from the user
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    const position = "beforeend";

    // Insert the todo item into the list with the given input for the format
    list.insertAdjacentHTML(position, item);
}

// Completed an item in the todo list
function completeToDo(element) {
    // Change the box to checked
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    // Put a line through the test
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    // Update the done value of the element within the list
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove an item from the todo list
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// EVENT LISTENERS
// Add items when the user hits the "ENTER" key on the keyboard
document.addEventListener("keyup", function(keyPress) {
    // Check if the enter key has been pressed
    if (keyPress.key == "Enter") {
        // Get the value from the user input field
        const toDo = input.value;

        // If the input isn't empty
        if (toDo) {
            // Run addToDo function
            addToDo(toDo, id, false, false);

            // Add items to the LIST variable
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // Add item to the local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id = id + 1;
        }

        // Clear the input
        input.value = "";
    }
});

// Add items when the user clicks the plus circle
document.addEventListener("click", function(userClick) {
    // Return the clicked element inside the document
    const element = userClick.target;

    const elementClass = element.classList.value;

    // Check if the plus circle element is pressed
    if (elementClass == "fa fa-plus-circle") {
        // Get the value from the user input field
        const toDo = input.value;

        // If the input isn't empty
        if (toDo) {
            // Run addToDo function
            addToDo(toDo, id, false, false);

            // Add items to the LIST variable
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // Add item to the local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id = id + 1;
        }

        // Clear the input
        input.value = "";
    }
});

// Check for updates in the list
list.addEventListener("click", function(userClick) {
    // Return the clicked element inside the list element
    const element = userClick.target;

    // Get the job attribute of the element
    const elementJob = element.attributes.job.value;

    // Check for complete (click circle) or remove (click trash can) values
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // Add item to the local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Clear the local storage
clear.addEventListener("click", function(userClick) {
    localStorage.clear();
});