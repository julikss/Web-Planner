'use strict';

const calendar = document.getElementById('calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const newEvent = document.getElementById('newEvent');
const modalBackDrop = document.getElementById('modalBackDrop');
const eventInput = document.getElementById('eventInput');
const correctEvent = document.getElementById('correctEvent');

let currentMonth = 0;
let currDay = null;
let events = new Map([]);

const checkEvent = (dayBlock, month, paddingdays, year, i) => {
  const currentEvent = events.get(`${month + 1}/${i - paddingdays}/${year}`);
  if (currentEvent) {
    console.log(currentEvent);
    const eventName = document.createElement('div');
    eventName.classList.add('event');
    eventName.innerText = currentEvent;
    dayBlock.appendChild(eventName);
  }
};

const addEvent = (date) => {
  currDay = date;
  const currentEvent = events.get(currDay);

  if (currentEvent) {
    correctEvent.style.display = 'block';
    modalBackDrop.style.display = 'block';
    document.getElementById('eventText').innerText = currentEvent;
  } else {
    newEvent.style.display = 'block';
    modalBackDrop.style.display = 'block';
  }

};

const makeBlocks = (displayedDays, paddingdays, year, month, day) => {
  for (let i = 1; i <= displayedDays; i++) {

    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    if (i === day + paddingdays && currentMonth === 0) {
      daySquare.classList.add('highlight');
    }
    if (i <= paddingdays) {
      daySquare.classList.add('padding');
    } else {
      daySquare.innerText = i - paddingdays;
      checkEvent(daySquare, month, paddingdays, year, i);
      daySquare.addEventListener('click',
        () => addEvent(`${month + 1}/${i - paddingdays}/${year}`));
    }
    calendar.appendChild(daySquare);
  }
};

const display = () => {
  const currDate = new Date();
  if (currentMonth !== 0) {
    currDate.setMonth(currDate.getMonth() + currentMonth);
  }

  const day = currDate.getDate();
  const month = currDate.getMonth();
  const year = currDate.getFullYear();

  const daysAmount = 32 - new Date(year, month, 32).getDate();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = weekdays[firstDay.getDay() - 1];
  const paddingdays = weekdays.indexOf(firstWeekday);
  const displayedDays = paddingdays + daysAmount;

  document.getElementById('monthButton')
    .innerText = `${months[month]} ${year}`;

  calendar.innerHTML = '';
  makeBlocks(displayedDays, paddingdays, year, month, day);

};

const pressButton = () => {
  document.getElementById('nextButton')
    .addEventListener('click', () => {
      currentMonth++;
      display();
    });

  document.getElementById('backButton')
    .addEventListener('click', () => {
      currentMonth--;
      display();
    });
};

const closeWindow = () => {
  eventInput.value = '';
  newEvent.style.display = 'none';
  modalBackDrop.style.display = 'none';
  eventInput.classList.remove('error');
  display();
};

const cancel = () => {
  document.getElementById('cancelButton')
    .addEventListener('click', () => {
      closeWindow();
    });
};

const saveEvents = () => {
  if (eventInput.value) {
    eventInput.classList.remove('error');
    events.set(
      currDay,
      eventInput.value
    );
    closeWindow();
    console.log(events);
  } else {
    eventInput.classList.add('error');
  }
};

const add = () => {
  document.getElementById('addButton')
    .addEventListener('click', () => {
      saveEvents();
    });
};

const deleteWindow = () => {
  deleteWindow.innerText = eventInput.value;
  correctEvent.style.display = 'none';
  modalBackDrop.style.display = 'none';
  eventInput.classList.remove('error');
  display();
  localStorage.clear();
};

const deleteEvent = () => {
  events = events.set(currDay);
  deleteWindow();
};

const finalButtons = () => {
  document.getElementById('deleteButton')
    .addEventListener('click', () => {
      deleteEvent();
    });

  document.getElementById('closeButton')
    .addEventListener('click', () => {
      deleteWindow();
    });
};

const manageButtons = () => {
  pressButton();
  cancel();
  add();
  finalButtons();
};

manageButtons();
display();
