const addButton = document.getElementById('add');
const inputTask = document.getElementById('new-task');
const unfinishedTasks = document.getElementById('unfinished-tasks');
const finishedTasks = document.getElementById('finished-tasks');


function createNewElement(task, finished) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('button');

    if (finished){
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i class='icons'>cancel</i>";
    }else {
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i class='icons'>✔done</i>";
    }
    
    const label = document.createElement('label');
    label.innerText = task;
    const input = document.createElement('input');
    input.type = "text";
    const editButton = document.createElement('button');
    editButton.className = "edit";
    editButton.innerHTML = "<i class='icons'>edit</i>";
    const deleteButton = document.createElement('button');
    deleteButton.className = "delete";
    deleteButton.innerHTML = "<i class='icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;
}

function addTask() {
    if (inputTask.value) {
        const listItem = createNewElement(inputTask.value, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
        inputTask.value = "";
    }
    save();
}
addButton.onclick = addTask;

function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function editTask() {
    const editButton = this;
    const listItem = this.parentNode;
    const label = listItem.querySelector('label');
    const input = listItem.querySelector('input[type=text]');

    const containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "edit";
        editButton.innerHTML = "<i class='icons'>edit</i>";
        save();
    } else {
        input.value = label.innerText;
        editButton.className = "save";
        editButton.innerHTML = "<i class='icons'>save</i>";

    }
    listItem.classList.toggle('editMode');
}

function finishTask() {
    const listItem = this.parentNode;
    const checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i class='icons'>cancel</i>";
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    const listItem = this.parentNode;
    const checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i class='icons'>✔done</i>";

    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    const checkbox = listItem.querySelector('button.checkbox');
    const editButton = listItem.querySelector('button.edit');
    const deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}
function save() {

    const unfinishedTasksArr = [];
    for (let i = 0; i < unfinishedTasks.children.length; i++) {
        unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    const finishedTasksArr = [];
    for (let i = 0; i < finishedTasks.children.length; i++) {
        finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTasks: unfinishedTasksArr,
        finishedTasks: finishedTasksArr
    }));

}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}

const data=load();

for(let i=0; i<data.unfinishedTasks.length;i++){
    const listItem=createNewElement(data.unfinishedTasks[i], false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

for(let i=0; i<data.finishedTasks.length; i++){
    const listItem=createNewElement(data.finishedTasks[i], true);
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}

//change background

const backgrs = document.querySelectorAll('.background');

for (const backgr of backgrs) {
    const id = backgr.id;
    backgr.addEventListener('click', () => {
        document.body.style.backgroundImage = `url('img/todolist/${id}.jpg')`;
    });
}
