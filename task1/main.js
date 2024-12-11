

//* get the tasks container
let tasksContainer = document.querySelector(".tasks-container");

console.log(tasksContainer);

// *get the task input
let taskInput = document.querySelector(".task-input");
console.log(taskInput);

//*make the add task function
function addTask() {
    let task = document.createElement("div");
    task.className = "task";
    //* add the task text to task
    let taskText = document.createElement("input");
    taskText.value = taskInput.value;
    taskText.type = "text";
    taskText.readOnly = true;
    task.appendChild(taskText);


    //* make the Done button
    let doneButton = document.createElement("button");
    doneButton.className = "done";
    doneButton.innerHTML = "Done";
    doneButton.onclick = doneTask;
    task.appendChild(doneButton);


    // * make the delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = deleteTask;
    task.appendChild(deleteButton);

    // * add the task to the tasks container
    tasksContainer.appendChild(task);
    // * clear the task input
    taskInput.value = "";
}

function deleteTask(e) {
    e.target.parentNode.remove();
}

function doneTask(e) {
    if (e.target.parentNode.className == "done-task") {
        e.target.parentNode.className = "task";
    } else {
        e.target.parentNode.className = "done-task";

    }
}