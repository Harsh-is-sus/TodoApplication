// Global Scope
var todoArray = []; // Empty Array

function saveTodos() {

    var title = document.getElementById("title").value.trim();

    if (title === "") {
        alert("Todo cannot be empty!"); 
        return;
    }
    todoArray.push(title);
    localStorage.setItem("todos", todoArray.toString());
    document.getElementById("title").value = "";
    fetchAllTodos();
}


function fetchAllTodos() {


    var str = localStorage.getItem("todos");

    if (str && str !== "") {
        todoArray = str.split(",");
    } else {
        todoArray = [];
    }

    var htmlString = "";

    if (todoArray.length > 0) {
        var htmlString = `
    <tr class="text-center">
        <th style="background-image: linear-gradient(to right,blue,purple,red); opacity:0.75;">Sr.no</th>
        <th style="background-color:red; opacity:0.72;">Title</th>
        <th style="background-image: linear-gradient(to left,blue,purple,red); opacity:0.75;">Actions</th>
    </tr>
    `;
        var counter = 0;
        todoArray.forEach((ele) => {
            counter++;
            htmlString += `
            <tr>
                <td class="text-center table-secondary"> ${counter} </td>
                <td class="text-center table-primary"> ${ele} </td>
                <td class="table-danger w-25">
                    <button class="btn btn-warning ms-5 me-5" onclick="editTodos(${counter - 1})"> Edit </button>
                    <button class="btn btn-danger ms-5" onclick="deleteTodos(${counter - 1})"> Delete </button>
                </td>

            </tr>
        `
        });
    }
    document.getElementById("todo-table").innerHTML = htmlString;
}

function removeAllTodos() {
    todoArray = [];
    localStorage.setItem("todos", todoArray.toString());
    document.getElementById("todo-table").innerHTML = "";
}

function editTodos(index) {
    var newValue = prompt("Do you want to update the value ?", todoArray[index]);
    if (newValue != null && newValue != "") {
        todoArray[index] = newValue;
    }
    localStorage.setItem("todos", todoArray.toString());
    fetchAllTodos(); // change the UI
}

let isDeleting = false; 

function deleteTodos(index) {

    if (isDeleting) return;


    isDeleting = true;

    
    if (confirm(`Do you want to delete ${todoArray[index]}?`)) {
        todoArray.splice(index, 1);
        localStorage.setItem("todos", todoArray.toString());
        fetchAllTodos(); // update UI
    }

    
    isDeleting = false;
}


function enterKeyPressed(event) {
    if (event.key == "Enter") {
        saveTodos();
    }
}
