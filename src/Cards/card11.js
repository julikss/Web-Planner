const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(divMaker);

function divMaker(text) {
  const div = document.createElement("div");
  const h2_question = document.createElement('h2');
  const h2_answer = document.createElement('h2');

  div.className = 'flashcard';

  h2_question.setAttribute("style", "padding: 15px; text-align:center; font-size:26px; margin-top:30px");
  h2_question.innerHTML = text.my_question;

  h2_answer.setAttribute("style", "text-align:center; font-size:26px; display:none; color: #c7c7c7");
  h2_answer.innerHTML = text.my_answer;

  div.appendChild(h2_question);
  div.appendChild(h2_answer);

  div.addEventListener("click", () => {
    if(h2_answer.style.display == "none")
      h2_answer.style.display = "block";
    else
      h2_answer.style.display = "none";
  })

  flashcards.appendChild(div);
}

const addFlashcard = () => {
  var flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1]);
  question.value = '';
  answer.value = '';
}

const delFlashcards = () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
}

const showCreateCardBox = () => {
  createCard.style.display = "block";
}

const hideCreateCardBox = () => {
  createCard.style.display = "none";
}

document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('pastel-mode');  
}

