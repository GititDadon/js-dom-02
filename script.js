
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const selectPriority = document.getElementById('priority-select');
const counter = document.getElementById('left');
const form = document.getElementById('task-form');
const buttons = document.getElementById('filters');
const clear = document.getElementById('clear-done');
const error = document.getElementById('error');
const empty = document.getElementById('empty');

// Step 1 - Add a task
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === '') {
        error.textContent = 'Please type a task';
        error.hidden = false;
        taskInput.focus();
        return;
    }

    // Bonus - Prevent duplicate tasks
    const allTask = taskList.querySelectorAll('li');

    for (const x of allTask) {
        const existingText = x.querySelector('.text').textContent;

        if (existingText.toLowerCase() === text.toLowerCase()) {
            error.textContent = 'This task already exists';
            error.hidden = false;
            taskInput.focus();
            return;
        }
    }

    error.textContent = '';
    error.hidden = true;

    const task = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = text;
    taskText.classList.add('text');
    task.appendChild(taskText);

    const val = selectPriority.value;
    task.classList.add(`priority-${val}`);

    // Fixed - Delete must be a button
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete');

    task.appendChild(deleteButton);
    taskList.appendChild(task);

    taskInput.value = '';
    taskInput.focus();

    updateCounter();
    ifEmpty();
    updateFilter();
});

// Step 2 + 3 - Toggle done / Delete
taskList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete');

    if (deleteButton && taskList.contains(deleteButton)) {
        const task = deleteButton.closest('li');

        if (task) {
            task.remove();
        }
    } else {
        const task = event.target.closest('li');

        if (task && taskList.contains(task)) {
            task.classList.toggle('done');
        }
    }

    updateCounter();
    ifEmpty();
    updateFilter();
});

// Step 4 - Tasks left counter
function updateCounter() {
    const activeTasks = taskList.querySelectorAll('li:not(.done)');
    counter.textContent = activeTasks.length;
}

// Step 5 - Filters
buttons.addEventListener('click', (event) => {
    const filter = event.target.closest('button[data-filter]');

    if (!filter || !buttons.contains(filter)) {
        return;
    }

    const filterButtons = buttons.querySelectorAll('button');

    filterButtons.forEach((btn) => {
        btn.classList.remove('active');
    });

    filter.classList.add('active');

    updateFilter();
});

function updateFilter() {
    const activeButton = buttons.querySelector('button.active');
    const filter = activeButton ? activeButton.dataset.filter : 'all';

    const allTask = taskList.querySelectorAll('li');

    allTask.forEach((task) => {
        if (filter === 'active') {
            task.hidden = task.classList.contains('done');
        } else if (filter === 'done') {
            task.hidden = !task.classList.contains('done');
        } else {
            task.hidden = false;
        }
    });
}

// Step 6 - Clear completed
clear.addEventListener('click', () => {
    const allTask = taskList.querySelectorAll('li');

    allTask.forEach((task) => {
        if (task.classList.contains('done')) {
            task.remove();
        }
    });

    updateCounter();
    ifEmpty();
    updateFilter();
});

// Step 7 - Empty message
function ifEmpty() {
    const allTask = taskList.querySelectorAll('li');
    empty.hidden = allTask.length > 0;
}

// Initial state
updateCounter();
ifEmpty();
updateFilter();
