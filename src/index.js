import './styles/main-page.css' 

let modal1 = document.getElementById('signup');
let modal2 = document.getElementById('signin');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}