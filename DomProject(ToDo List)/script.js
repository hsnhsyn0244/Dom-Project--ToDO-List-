//ToDo Elaman Ekleme

//eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;



//load items
loadItems();

eventListeners();


function eventListeners() {
    //submit event
    form.addEventListener("submit", addNewItem);
    // delete event
    taskList.addEventListener("click", deleteItem);
    // Delete all
    btnDeleteAll.addEventListener("click", deleteAllItem);
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    });
}
//get ıtems from local storange
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
//set ıtem to local storonge
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newTodo) {
    // Lİ olusturma

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    //a olusturma

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}


//elemean ekleme
function addNewItem(e) {
    if (input.value === '') {
        alert("Add new Item");
    }

    //create ıtem
    createItem(input.value);
    setItemToLS(input.value);

    input.value = "";
    e.preventDefault();
}

// Eleman sılme
function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek İstediğinize Eminmisiniz ?")) {
            //console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        }
    }
    e.preventDefault();
}
function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Celar Item (Hepsını sılme)

function deleteAllItem(e) {
    if (confirm("Tüm elemanları silmek istediğinize eminmisiniz ?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }
    //taskList.innerHTML="";
}