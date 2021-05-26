function randCard(num) {
  return num[Math.floor(Math.random()*num.length)];
}

const num = ["hello","cat", "hi", "nya"];

//const nextBtn = document.getElementById("next");
const card = document.getElementById("card");

//nextBtn.addEventListener("click", () => {
  //getNextCard();
//});
window.onload = pageLoad;

function pageLoad() {
  const nextBtn = document.getElementById("next").addEventListener('click', getNextCard);
}

function getNextCard() {
  const rCard = document.createElement("div");
  rCard.classList.add("randomCards");

  rCard.innerText = randCard(num);

  card.appendChild(rCard);

}


/*function randomItem(quotes) {
  return quotes[Math.floor(Math.random()*quotes.length)];
}
const quotes = ["Главное в жизни - это уметь думать. Попытайтесь пожалуйста",
    "Прекрати бежать напрасно, друг мой, ты не обязан мечтать обо всём",
    "Люди всегда видят лишь то, что хотят видеть",
    "Не попади в ловушку чужой мечты",
    "Я говорил, что мы выиграем. Хотя я не верил в это",
    "Если головоломка не сложилась и тебе не подобрать пазлы, то начинай сначала",
    "Птица говорун отличается умом и сообразительностью"];

window.onload = pageLoad;

function pageLoad() {
  const startBtn = document.getElementById("btn").addEventListener('click', createNotification);
}

function createNotification() {
  const notif = document.createElement("div");
  notif.classList.add("toast");

  notif.innerText = randomItem(quotes);


  container.appendChild(notif);

  setTimeout(() => {
      notif.remove();
   }, 6000);

   btn.removeEventListener('click',createNotification);
 }*/
