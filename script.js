alert('here');
document.querySelectorAll('.circle-card').forEach(card => {
    alert('here');
      card.addEventListener('click', () => {
          card.classList.toggle('active');
      });
  });

//   function updateStreakNumber(newNumber) {
// document.getElementById('streakNumber').textContent = newNumber;
// }

updateStreakNumber(5);

let currentDate = new Date();

function updateCalendar() {
const startOfWeek = getStartOfWeek(currentDate);
const options = { month: 'long' };
const month = startOfWeek.toLocaleDateString('en-US', options);
document.querySelector('.month-display').textContent = month;

const days = document.querySelectorAll('.week-display .day .date');
days.forEach((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + index);
    day.textContent = date.getDate();
    day.classList.toggle('bold', date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth());
});
}

function getStartOfWeek(date) {
const day = date.getDay();
const start = new Date(date);
start.setDate(date.getDate() - day);
return start;
}

document.getElementById('prevWeek').addEventListener('click', function() {
    alert('here');
currentDate.setDate(currentDate.getDate() - 7);
updateCalendar();
});

document.getElementById('nextWeek').addEventListener('click', function() {
currentDate.setDate(currentDate.getDate() + 7);
updateCalendar();
});

updateCalendar();