//selectors
const inputElement = document.getElementById("name");
const todoAddBtn = document.getElementById("todoAddBtn");
const ulList = document.getElementsByClassName("list")[0];
const select = document.getElementById("filter-todo");
const inputError =document.getElementsByClassName("emtyInputError")[0];

//event listners
document.addEventListener("DOMContentLoaded",getTodod)
todoAddBtn.addEventListener("click", checkForEmptyInput);
ulList.addEventListener("click", checkMarkDelete);
select.addEventListener("click", filter);
inputElement.addEventListener("click",()=>{
  inputError.style.display ="none";
})

//functions
function checkForEmptyInput(event){
  //preventing from loading when submit button is clicked
  event.preventDefault();
  if(inputElement.value ==""){
    inputError.style.display ="flex";
  }else{
    addToDo();
  }
}

function addToDo(event) {
  savelocal(inputElement.value);
  //creating to-do-item div
  const toDoItem = document.createElement("div");
  toDoItem.classList.add("to-do-item");

  //creating to-do li
  const toDoLi = document.createElement("li");
  toDoLi.classList.add("to-do");
  toDoLi.innerText = inputElement.value;

  //creating done button
  const doneButton = document.createElement("button");
  doneButton.classList.add("material-symbols-outlined");
  doneButton.classList.add("doneIcon");
  doneButton.innerText = "done";

  //creating delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("material-symbols-outlined");
  deleteButton.classList.add("delIcon");
  deleteButton.innerText = "delete";

  

  //appeding the li and buttons to div to ul
  toDoItem.appendChild(toDoLi);
  toDoItem.appendChild(doneButton);
  toDoItem.appendChild(deleteButton);

  //verify weather this is the first elemtn insertion
  const position = ulList.firstElementChild;
  if(position == "null"){
    ulList.appendChild(toDoItem);

  }else{
    ulList.insertBefore(toDoItem,position);
  }
  
  inputElement.value ="";

}

function checkMarkDelete(event) {
  const clickedtarget = event.target;
  if (clickedtarget.classList[1] === "doneIcon") {
    const targetParent = clickedtarget.parentElement;
    targetParent.classList.toggle("completed");
    targetParent.firstChild.classList.toggle("line-Through");
  }
  if (clickedtarget.classList[1] === "delIcon") {
    const targetParent = clickedtarget.parentElement;
    targetParent.classList.add("fall");
    //animation
    targetParent.addEventListener("transitionend", () => {
      targetParent.remove();
    });
    removelocaltodo(targetParent)
  }
}

function filter(event) {
  const todos = ulList.children;
  const todosArray = Array.from(todos);
  todosArray.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "pending":
        if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          }else{
            todo.style.display = "none";
          }
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
    }
  });
}

function savelocal(todo){
  //check --do i already have thing in there
  let todos=[];
  if (localStorage.getItem("todos")==null){
    todos=[];
  }else{
    todos =JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  todos.push(todo);
  console.log(todos);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodod(){
  let todos=[];
  if (localStorage.getItem("todos")==null){
    todos=[];
  }else{
    todos =JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo)=>{
    const toDoItem = document.createElement("div");
  toDoItem.classList.add("to-do-item");

  //creating to-do li
  const toDoLi = document.createElement("li");
  toDoLi.classList.add("to-do");
  toDoLi.innerText = todo ;

  //creating done button
  const doneButton = document.createElement("button");
  doneButton.classList.add("material-symbols-outlined");
  doneButton.classList.add("doneIcon");
  doneButton.innerText = "done";

  //creating delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("material-symbols-outlined");
  deleteButton.classList.add("delIcon");
  deleteButton.innerText = "delete";

  

  //appeding the li and buttons to div to ul
  toDoItem.appendChild(toDoLi);
  toDoItem.appendChild(doneButton);
  toDoItem.appendChild(deleteButton);

  //verify weather this is the first elemtn insertion
  const position = ulList.firstElementChild;
  if(position == "null"){
    ulList.appendChild(toDoItem);

  }else{
    ulList.insertBefore(toDoItem,position);
  }
  
  inputElement.value ="";
  })
}

function removelocaltodo(todo){
  let todos=JSON.parse(localStorage.getItem("todos"));
  let removetext=todo.children[0].innerText;
  todos.splice(todos.indexOf(removetext),1);
  localStorage.setItem("todos",JSON.stringify(todos));

}