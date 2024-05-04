let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

// Constants
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function renderCalendar() {
	const title = document.getElementById('calendar-title');
	title.innerText = `${monthNames[currentMonth]} ${currentYear}`;
}

window.addEventListener('load', (e) => {
	renderCalendar();
});