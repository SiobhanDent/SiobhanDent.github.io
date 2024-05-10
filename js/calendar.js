let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

// Constants
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function renderCalendar() {
	const title = document.getElementById('calendar-title');
	title.innerText = `${monthNames[currentMonth]} ${currentYear}`;

	// Highlight cell of current day.
	let currentDay = new Date().getDate();
	let days = document.getElementsByClassName("day-active");
	days[currentDay - 1].classList.add('day-current');
}

window.addEventListener('load', (e) => {
	renderCalendar();
});