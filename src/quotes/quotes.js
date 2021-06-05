'use strict';

const hideText = document.getElementById('overlay');
const getText = document.getElementById('help');
const getQuotes = document.getElementById('getQuo');

function randomItem(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
const quotes = ['Главное в жизни - это уметь думать. Попытайтесь пожалуйста',
  'Прекрати бежать напрасно, друг мой, ты не обязан мечтать обо всём',
  'Люди всегда видят лишь то, что хотят видеть',
  'Не попади в ловушку чужой мечты',
  'Чем дальше от понедельника, тем добрее утро.',
  'Во всём виноваты воскресенья, не будь воскресений, не было бы и понедельников!',
  'Я говорил, что мы выиграем. Хотя я не верил в это',
  'Если головоломка не сложилась и тебе не подобрать пазлы, то начинай сначала',
  'It’s Sunday, therefore I am 100% motivated to do nothing today!',
  'Sunday clears away the rust of the whole week.',
  'Sunday checklist: do nothing & chill.'
];

function getGreeting() {
  let greeting;
  const time = new Date().getHours();

  const aftHourQuo = 10;
  const evHourQuo = 18;

  if (time < aftHourQuo) greeting = 'Good morning';
  else if (time < evHourQuo) greeting = 'Good day';
  else greeting = 'Good evening';

  document.getElementById('gr').innerHTML = greeting + ' ' + randomItem(quotes);
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
  getGreeting();
  lockoutSubmit();
});

getText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'block';
});

hideText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
});

function setImage() {
  const timeIm = new Date().getHours();

  const aftHourImg = 14;
  const evHourImg = 19;

  if (timeIm < aftHourImg) document.body.style.backgroundImage = 'url(\'./img/back1.png\')';
  else if (timeIm < evHourImg) document.body.style.backgroundImage = 'url(\'./img/back2.png\')';
  else document.body.style.backgroundImage = 'url(\'./img/back3.png\')';
}
setImage();
