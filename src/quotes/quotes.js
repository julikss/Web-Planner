const hideText = document.getElementById("overlay");
const getText = document.getElementById("help");
const getQuotes = document.getElementById("getQuo");
const fs = require("fs");
const quo = require('./quotes.json');
fs.readFile('./quotes.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    const obj = JSON.parse(data);
});

const random = quo.quotes[Math.floor(Math.random() * quo.quotes.length)];
  
function getGreeting() {
  let greeting;
  const time = new Date().getHours();

  if (time < 10) greeting = "Good morning";
  else if (time < 18) greeting = "Good day";
  else greeting = "Good evening";

  document.getElementById("gr").innerHTML = greeting + " " + random;

  function createNotification() {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = greeting + " " + randomItem(quotes);

    container.appendChild(notif);
  }
}

function lockoutSubmit(button) {
  const oldValue = button.value;

  button.setAttribute('disabled', true);

  setTimeout(function() {
    button.value = oldValue;
    button.removeAttribute('disabled');
  }, 4000 * 60 * 60);
}

getQuotes.addEventListener("click", () => {
  getGreeting();
  createNotification();
  lockoutSubmit(button);
});

getText.addEventListener("click", () => {
  document.getElementById("overlay").style.display = "block";
});

hideText.addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
});

function setImage() {
  const time = new Date().getHours();

  if (time < 14) { document.body.style.backgroundImage = "url('./img/back1.png')"; }
  else if (time < 19) { document.body.style.backgroundImage = "url('./img/back2.png')"; }
  else { document.body.style.backgroundImage = "url('./img/back3.png')"; }
}
setImage();
