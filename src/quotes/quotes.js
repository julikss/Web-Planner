const hideText = document.getElementById('overlay');
const getText = document.getElementById('help');
const getQuotes = document.getElementById('getQuo');

const day1 = ['Главное в жизни - это уметь думать. Попытайтесь пожалуйста',
  'Если головоломка не сложилась и тебе не подобрать пазлы, то начинай сначала',
  'Чем дальше от понедельника, тем добрее утро.',
  'Во всём виноваты воскресенья, не будь воскресений, не было бы и понедельников!',
  '— Мне не встать. Понедельник наступил.... прямо на меня.',
  'Ничто не в силах прикончить человека так, как понедельник'
];
const day2 = [
  'Believe in yourself. Your limitation—it\'s only your imagination.',
  'Work hard. Push yourself, because no one else is going to do it for you.',
  'Be yourself; everyone else is already taken.',
  'Tuesday is my favorite day of the week. That’s cleaning day.',
  'Happy Tuesday! You got to admit, at least it sounds better than happy Monday.'
];
const day3 = [
  'Always forgive your enemies; nothing annoys them so much.',
  'A friend is someone who knows all about you and still loves you.',
  'Without music, life would be a mistake.',
  'Only I can change my life. No one can do it for me.',
  'Die with memories, not dreams.',
  'Wednesdays are like Mondays in the middle of the week!',
  'A Wednesday with no rain is a dry hump day.'
];
const day4 = [
  'Не попади в ловушку чужой мечты',
  'Прекрати бежать напрасно, друг мой, ты не обязан мечтать обо всём',
  'Success is not luck!',
  'Люди всегда видят лишь то, что хотят видеть'

];
const day5 = [
  'Я говорил, что мы выиграем. Хотя я не верил в это',
  'It’s Friday morning mankind! Good vibe, don’t frown and let the monster see you smile!',
  'Friday sees more smiles than any other day of the workweek!',
  'Friday is my second favorite F word. Food is my first',
  'Life is good especially on a Friday.'
];
const day6 = [
  'The knowledge of "how to do it" is detained in "why should it be done?',
  'Life is a wretched gray Saturday, but it has to be lived through.',
  'Weekends don’t count unless you spend them doing something completely pointless.',
  'My work is like my vacation, so in a way, every day is like Saturday',
  'Oh, my sweet Saturday, I have been waiting for you for six long days'
];
const day7 = [
  'Your attitude, more than anything, will influence your effectiveness.',
  'It’s Sunday, therefore I am 100% motivated to do nothing today!',
  'Sunday clears away the rust of the whole week.',
  'Sunday checklist: do nothing & chill.'
];

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
  const timeIm = new Date().getHours();

  if (timeIm < 14) document.body.style.backgroundImage = 'url(\'./img/back1.png\')';
  else if (timeIm < 19) document.body.style.backgroundImage = 'url(\'./img/back2.png\')';
  else document.body.style.backgroundImage = 'url(\'./img/back3.png\')';
}
setImage();
