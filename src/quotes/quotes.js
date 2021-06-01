const hideText = document.getElementById('overlay');
const getText = document.getElementById('help');
const getQuotes = document.getElementById('getQuo');

const day1 = ['Главное в жизни - это уметь думать. Попытайтесь пожалуйста',
  'Прекрати бежать напрасно, друг мой, ты не обязан мечтать обо всём',
  'Люди всегда видят лишь то, что хотят видеть',
  'Не попади в ловушку чужой мечты',
  'Я говорил, что мы выиграем. Хотя я не верил в это',
  'Если головоломка не сложилась и тебе не подобрать пазлы, то начинай сначала'
];
const day2 = [
  'Believe in yourself. Your limitation—it\'s only your imagination.',
  'Work hard. Push yourself, because no one else is going to do it for you.',
  'Be yourself; everyone else is already taken.',
  'Будьте собой и говорите, что чувствуете, потому что те, кто возражает, не имеют значения, а те, кто имеет значение, не возражают'
];
const day3 = [
  'Always forgive your enemies; nothing annoys them so much.',
  'A friend is someone who knows all about you and still loves you.',
  'Without music, life would be a mistake.',
  'Only I can change my life. No one can do it for me.',
  'Die with memories, not dreams.'
];

function week() {
  const n = new Date().getDay();

  const random = `day${n}`[Math.floor(Math.random() * `day${n}`.length)];// doesnt wotk returned undefine
}
function getGreeting() {
  let greeting;
  const time = new Date().getHours();

  if (time < 10) greeting = 'Good morning';
  else if (time < 18) greeting = 'Good day';
  else greeting = 'Good evening';

  document.getElementById('gr').innerHTML = greeting + ' ' + week();

  function createNotification() {
    const notif = document.createElement('div');
    notif.innerText = greeting + ' ' + week();

    container.appendChild(notif);
  }
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
  createNotification();
  lockoutSubmit(button);
});

getText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'block';
});

hideText.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
});

function setImage() {
  const time = new Date().getHours();

  if (time < 14) document.body.style.backgroundImage = 'url(\'./img/back1.png\')';
  else if (time < 19) document.body.style.backgroundImage = 'url(\'./img/back2.png\')';
  else document.body.style.backgroundImage = 'url(\'./img/back3.png\')';
}
setImage();
