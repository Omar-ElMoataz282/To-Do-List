let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (window.localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("Tasks"));
}

//Get Data From Local Storage
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    //Add Task To Array
    addDataToArray(input.value);

    //Make Input Impty
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //Remove From Local Storage
    deleteTask(e.target.parentElement.getAttribute("data-id"));

    //Remove Parent (Div)
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    //Add Done To Task
    taskDone(e.target.getAttribute("data-id"));

    //Add Class Done
    e.target.classList.toggle("done");
  }
});

function addDataToArray(taskTitle) {
  let data = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };
  arrayOfTasks.push(data);

  //Add Task To Page (Element)
  addTaskToPage(arrayOfTasks);

  //Add Task To Local Storage
  addDataToLocalStorage(arrayOfTasks);
}

function addTaskToPage(tasks) {
  //Make TasksDiv Empty
  tasksDiv.innerHTML = "";

  tasks.forEach((task) => {
    //create Task With Class And Attr
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "done task";
    }
    div.setAttribute("data-id", task.id);

    //Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    //Append Task Title
    div.appendChild(document.createTextNode(task.title));

    //Append Delete Button To Div
    div.appendChild(span);

    //Append Div To Tasks Div
    tasksDiv.append(div);
  });
}

function addDataToLocalStorage(data) {
  window.localStorage.setItem("Tasks", JSON.stringify(data));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("Tasks");

  if (data) {
    tasks = JSON.parse(data);

    addTaskToPage(tasks);
  }
}

function deleteTask(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addDataToLocalStorage(arrayOfTasks);
}

function taskDone(id) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
