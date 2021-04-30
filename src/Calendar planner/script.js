let currentMonth=0;
let click=null;
let events=localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar=document.getElementById('calendar');
const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const months=['January','February','March','April','May','June','July',
'August','September','October','November','December'];
const newEvent=document.getElementById('newEvent');
const modalBackDrop=document.getElementById('modalBackDrop');

const display = () => {

const currDate=new Date();

if(currentMonth !== 0) {
  currDate.setMonth(new Date().getMonth()+currentMonth);
}

const day=currDate.getDate();
const month=currDate.getMonth();
const year=currDate.getFullYear();

const daysAmount=32 - new Date(year, month, 32).getDate();
const firstDay=new Date(year,month,1);
const dateString=firstDay.toLocaleDateString('en-us');
const firstWeekday=weekdays[firstDay.getDay()-1];
const paddingdays=weekdays.indexOf(firstWeekday);
const displayedDays=paddingdays+daysAmount;

document.getElementById('monthButton').innerText = `${months[month]} ${year}`;

calendar.innerHTML = ''; 

for(let i=1; i<=displayedDays; i++){
const daySquare=document.createElement('div');
daySquare.classList.add('day');

if (i>paddingdays) {
daySquare.innerText=i-paddingdays;
daySquare.addEventListener('click', () => addEvent(`${month+1}/${i-paddingdays}/${year}`));
} else {
daySquare.classList.add('padding');
}
calendar.appendChild(daySquare);
}

}

const pressButton = () => {
document.getElementById('nextButton').addEventListener('click', ()=>{
    currentMonth++;
    display();
});

document.getElementById('backButton').addEventListener('click', ()=>{
    currentMonth--;
    display();
});
}

const addEvent = (date) => {
    click = date;
    const currentEvent = events.find(x => x.date === click);

    if(currentEvent) {
      console.log('Event is already there');
    } else {
       newEvent.style.display='block';
    }
    modalBackDrop.style.display='block';
}

pressButton()
display();



