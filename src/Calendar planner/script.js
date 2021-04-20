let currentMonth=0;
let click=null;
let events=localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar=document.getElementById('calendar');
const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const display=()=>{
const currDate=new Date();
const day=currDate.getDate();
const month=currDate.getMonth();
const year=currDate.getFullYear();

const daysAmount=32 - new Date(year, month, 32).getDate();
const firstDay=new Date(year,month,1);
const dateString=firstDay.toLocaleDateString('en-us');
const firstWeekday=weekdays[firstDay.getDay()-1];
const paddingdays=weekdays.indexOf(firstWeekday);
const displayedDays=paddingdays+daysAmount;

for(let i=1; i<=displayedDays; i++){
const daySquare=document.createElement('div');
daySquare.classList.add('day');

if (i>paddingdays) {
daySquare.innerText=i-paddingdays;
daySquare.addEventListener('click', () => console.log('click'));
} else {
daySquare.classList.add('padding');
}
calendar.appendChild(daySquare);
}

}
display();



