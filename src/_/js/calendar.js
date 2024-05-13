let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

function renderCalendar() {
	// Highlight cell of current day.
	let currentDay = new Date().getDate();
	let days = document.getElementsByClassName("day-active");
	days[currentDay - 1].classList.add('day-current');
}

window.addEventListener('load', (e) => {
	renderCalendar();
});