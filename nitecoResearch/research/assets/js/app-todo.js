const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    // DOM load event listeners
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    // clear task
    clearBtn.addEventListener('click', clearTask);
    // filter task
    filter.addEventListener('keyup', filterTasks);
}
// Get tasks from localstorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element
        const li  = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = ' <i class="ti-close"></i>';
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    });
}
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }
    // create li element
    const li  = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = ' <i class="ti-close"></i>';
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task){
    
    let tasks;  
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("are you sure?")){
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.firstChild);
        }
    }
}
// remove from Local storage
function removeTaskFromLocalStorage(taskItem){
    
    
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        console.log('>>>>>>>>>>>>',task + " ----- " + taskItem.textContent);
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTask(e){
    taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // clear from local storage
    clearTaskFromLocalStorage();
}
// clear task form local storage 
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != '-1'){
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
