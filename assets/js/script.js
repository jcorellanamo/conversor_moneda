let tasks = [
    { id: 1, description: 'Tarea inicial 1', completed: false },
    { id: 2, description: 'Tarea inicial 2', completed: false },
    { id: 3, description: 'Tarea inicial 3', completed: false }
];
let nextId = 4; 

function addTask() {
    const taskInput = document.getElementById('new-task-input');
    const taskDescription = taskInput.value.trim();
    
    if (taskDescription === '') {
        return;
    }

    const task = {
        id: nextId++,
        description: taskDescription,
        completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    updateTaskList();
    updateStats();
}

function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    updateTaskList();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    updateStats();
}

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td class="${task.completed ? 'task-completed' : ''}">${task.description}</td>
            <td>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Cambiar' : 'Completar'}</button>
                <button onclick="deleteTask(${task.id})">Eliminar</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function updateStats() {
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

document.addEventListener('DOMContentLoaded', () => {
    updateTaskList();
    updateStats();
});
