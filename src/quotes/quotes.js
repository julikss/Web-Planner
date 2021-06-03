import {day1, day2, day3, day4, day5, day6, day7} from 'datQuo.js'

const hideText = document.getElementById('overlay');
const getText = document.getElementById('help');
const getQuotes = document.getElementById('getQuo');

const days = [day1, day2, day3, day4, day5, day6, day7];

function week() {
  const n = new Date().getDay();
  const currDay = days[n - 1];
  const random = currDay[Math.floor(Math.random() * currDay.length)];
  return random;
}

function getGreeting() {
  let greeting;
  const time = new Date().getHours();

  if (time < 10) greeting = 'Good morning';
  else if (time < 18) greeting = 'Good day';
  else greeting = 'Good evening';

  document.getElementById('gr').innerHTML = greeting + ' ' + week();
}

function lockoutSubmit(button) {
  const oldValue = button.value;

  button.setAttribute('disabled', true);

  setTimeout(() => {
    button.value = oldValue;
    button.removeAttribute('disabled');
  }, 4000 * 60 * 60);
}

getQuotes.addEventListener('click', () => {
  week();
  getGreeting();
  lockoutSubmit(button);
});

getText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'block';
});

hideText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
});

function setImage() {
  const timeIm = new Date().getHours();

  if (timeIm < 14) document.body.style.backgroundImage = 'url(\'./img/back1.png\')';
  else if (timeIm < 19) document.body.style.backgroundImage = 'url(\'./img/back2.png\')';
  else document.body.style.backgroundImage = 'url(\'./img/back3.png\')';
}
setImage();
