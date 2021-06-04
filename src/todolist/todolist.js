'use strict';
const addButton = document.getElementById('add');
const inputTask = document.getElementById('new-task');
const doTasks = document.getElementById('unfinished-tasks');
const doneTasks = document.getElementById('finished-tasks');

// change background
const backgrs = document.querySelectorAll('.background');
for (const backgr of backgrs) {
  const id = backgr.id;
  backgr.addEventListener('click', () => {
    document.body.style.backgroundImage = `url('/src/todolist/img/${id}.jpg')`;
  });
}

function createNewElement(task, finished) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('button');

  if (finished) {
    checkbox.className = 'checkbox';
    checkbox.innerHTML = '<i class=\'icons\'>cancel</i>';
  } else {
    checkbox.className = 'checkbox';
    checkbox.innerHTML = '<i class=\'icons\'>✔done</i>';
  }

  const label = document.createElement('label');
  label.innerText = task;
  const input = document.createElement('input');
  input.type = 'text';
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerHTML = '<i class=\'icons\'>edit</i>';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = '<i class=\'icons\'>delete</i>';

  const appendChild = [checkbox, label, input, deleteButton, editButton];
  for (let i = 0; i < appendChild.length; i++) {
    listItem.appendChild(appendChild[i]);
  }

  return listItem;
}

function addTask() {
  if (inputTask.value) {
    const listItem = createNewElement(inputTask.value, false);
    doTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value = '';
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
  } else {
    input.value = label.innerText;
  }
  const className = (containsClass) ? 'edit' : 'save';
  editButton.className = className;
  editButton.innerHTML = `<i class="icons">${className}</i>`;
  if (containsClass) save();

  listItem.classList.toggle('editMode');
}

function finishTask() {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'checkbox';
  checkbox.innerHTML = '<i class=\'icons\'>cancel</i>';
  doneTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'checkbox';
  checkbox.innerHTML = '<i class=\'icons\'>✔done</i>';

  doTasks.appendChild(listItem);
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
  const doTasksArr = [];
  for (let i = 0; i < doTasks.children.length; i++) {
    doTasksArr.push(doTasks.children[i].getElementsByTagName('label')[0].innerText);
  }
  const doneTasksArr = [];
  for (let i = 0; i < doneTasks.children.length; i++) {
    doneTasksArr.push(doneTasks.children[i].getElementsByTagName('label')[0].innerText);
  }
  localStorage.removeItem('todo');
  localStorage.setItem('todo', JSON.stringify({
    doTasks: doTasksArr,
    doneTasks: doneTasksArr
  }));
}

function load() {
  return JSON.parse(localStorage.getItem('todo'));
}

const data = load();

for (let i = 0; i < data.doTasks.length; i++) {
  const listItem = createNewElement(data.doTasks[i], false);
  doTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
}

for (let i = 0; i < data.doneTasks.length; i++) {
  const listItem = createNewElement(data.doneTasks[i], true);
  doneTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}
