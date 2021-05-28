'use strict'

const calendar=document.getElementById('calendar');
const weekdays=['Monday','Tuesday','Wednesday','Thursday',
'Friday','Saturday','Sunday'];
const months=['January','February','March','April','May','June','July',
'August','September','October','November','December'];
const newEvent=document.getElementById('newEvent');
const modalBackDrop=document.getElementById('modalBackDrop');
const eventInput = document.getElementById('eventInput');

let currentMonth=0;
let currDay=null;
let events=localStorage.getItem('events') ?
 JSON.parse(localStorage.getItem('events')) : [];

const display = () => {

const currDate=new Date();

if(currentMonth !== 0) {
  currDate.setMonth(new Date().getMonth()+currentMonth);
}

const day=currDate.getDate();
const month=currDate.getMonth();
const year=currDate.getFullYear();

const daysAmount=32 - new Date(year, month, 32).getDate();
const firstDay=new Date(year,month,1);
const firstWeekday=weekdays[firstDay.getDay()-1];
const paddingdays=weekdays.indexOf(firstWeekday);
const displayedDays=paddingdays+daysAmount;

document.getElementById('monthButton')
.innerText = `${months[month]} ${year}`;

calendar.innerHTML = ''; 

for(let i=1; i<=displayedDays; i++){
  
const daySquare=document.createElement('div');
daySquare.classList.add('day');
if(i == day+paddingdays && currentMonth == 0){
  daySquare.classList.add('highlight');
}
if (i > paddingdays) {
daySquare.innerText=i-paddingdays;

const currentEvent = events.find(x =>
   x.date === `${month+1}/${i-paddingdays}/${year}`);

if (currentEvent) {
  console.log(currentEvent);
 const eventName = document.createElement('div');
 eventName.classList.add('event');
 eventName.innerText = currentEvent.event;
 daySquare.appendChild(eventName);
}

daySquare.addEventListener('click',
 () => addEvent(`${month+1}/${i-paddingdays}/${year}`));
} else {
daySquare.classList.add('padding');
}

calendar.appendChild(daySquare);
}
}

const pressButton = () => {
document.getElementById('nextButton')
.addEventListener('click', ()=>{
    currentMonth++;
    display();
});

document.getElementById('backButton')
.addEventListener('click', ()=>{
    currentMonth--;
    display();
});
}

const addEvent = (date) => {
    currDay = date;
    const currentEvent = events.find(x => x.date === currDay);

    if(currentEvent) {
      correctEvent.style.display = 'block';
       modalBackDrop.style.display = 'block';
       document.getElementById('eventText').innerText = currentEvent.event;
    } else {
       newEvent.style.display = 'block';
       modalBackDrop.style.display = 'block';
    }
    
}
const closeWindow = () => {
  eventInput.value = '';
  newEvent.style.display = 'none';
  modalBackDrop.style.display = 'none';
  eventInput.classList.remove('error');
  display();
}

const cancel = () => {
  document.getElementById('cancelButton')
  .addEventListener('click', ( )=> {
    closeWindow();
});
}

const saveEvents = () => {
  if (eventInput.value) {
    eventInput.classList.remove('error');
    events.push({
     date: currDay,
     event: eventInput.value,
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeWindow();
    console.log(events);
  } else {
    eventInput.classList.add('error');
  }
 }

const add = () => {
  document.getElementById('addButton')
  .addEventListener('click', () => {
    saveEvents();
});
}

const manageButtons = () => {
  cancel();
  add();
}

const deleteWindow = () => {
  deleteWindow.innerText = eventInput.value;
  correctEvent.style.display = 'none';
  modalBackDrop.style.display = 'none';
  eventInput.classList.remove('error');
  display();
}

const deleteEvent = () => {
events = events.filter(x => x.date != currDay);
deleteWindow();
}

const finalButtons = () => {
  document.getElementById('deleteButton')
.addEventListener('click', ()=>{
  deleteEvent();
});

document.getElementById('closeButton')
  .addEventListener('click', ( )=> {
    deleteWindow();
});
}

manageButtons();
finalButtons();
pressButton()
display();
//localStorage.clear();

