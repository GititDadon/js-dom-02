
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

    error.hidden = true;

    const task = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = text;
    taskText.classList.add('text');
    task.appendChild(taskText);

    const val = selectPriority.value;
    task.classList.add(`priority-${val}`);

    const deleteSpan = document.createElement('span');
    deleteSpan.textContent = 'x';
    deleteSpan.classList.add('delete');
    task.appendChild(deleteSpan);

    taskList.appendChild(task);

    taskInput.value = '';
    taskInput.focus();

    updateCounter();
    ifEmpty();
    updateFilter();
});

// Step 2 + 3 - Toggle done / Delete
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const task = event.target.closest('li');

        if (task) {
            task.remove();
        }
    } else {
        const task = event.target.closest('li');

        if (task) {
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

    if (filter === 'active') {
        allTask.forEach((x) => {
            if (x.classList.contains('done')) {
                x.hidden = true;
            } else {
                x.hidden = false;
            }
        });

    } else if (filter === 'done') {
        allTask.forEach((x) => {
            if (x.classList.contains('done')) {
                x.hidden = false;
            } else {
                x.hidden = true;
            }
        });

    } else if (filter === 'all') {
        allTask.forEach((x) => {
            x.hidden = false;
        });
    }
}

// Step 6 - Clear completed
clear.addEventListener('click', () => {
    const allTask = taskList.querySelectorAll('li');

    allTask.forEach((x) => {
        if (x.classList.contains('done')) {
            x.remove();
        }
    });

    updateCounter();
    ifEmpty();
    updateFilter();
});

// Step 7 - Empty message
function ifEmpty() {
    const allTask = taskList.querySelectorAll('li');

    if (allTask.length === 0) {
        empty.hidden = false;
    } else {
        empty.hidden = true;
    }
}

// Initial state
updateCounter();
ifEmpty();
updateFilter();
ד