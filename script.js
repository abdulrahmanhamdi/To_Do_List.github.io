document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText);
        storeTask(taskText);
        taskInput.value = '';
    }
}

function addTaskToDOM(taskText) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    listItem.querySelector('.delete-btn').addEventListener('click', function() {
        taskList.removeChild(listItem);
        removeTask(taskText);
    });

    taskList.appendChild(listItem);
}

function storeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
