


function randomItem(quotes) {
  return quotes[Math.floor(Math.random()*quotes.length)];
}
const quotes = ["Главное в жизни - это уметь думать. Попытайтесь пожалуйста",
    "Прекрати бежать напросно, друг мой, ты не обязан мечтать обо всём",
    "Люди всегда видят лишь то, что хотят видеть",
    "Не попади в ловушку чужой мечты",
    "Я говорил, что мы выиграем. Хотя я не верил в это",
    "Если головоломка не сложилась и тебе не подобрать пазлы, то начинай сначала"];

window.onload = pageLoad

function pageLoad() {
  const startBtn = document.getElementById("btn");

  //startBtn.onclick = createNotification();
  btn.addEventListener("click", () => {
      createNotification();
  });
}

function createNotification() {
  const notif = document.createElement("div");
  notif.classList.add("toast");

  notif.innerText = randomItem(quotes);


  container.appendChild(notif);

  setTimeout(() => {
      notif.remove();
   }, 6000);
}
