import {
	addMonths,
	format,
	fromUnixTime,
	getUnixTime,
	subMonths,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
    isSameMonth,
    isSameDay
} from "date-fns";

const dateButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const currentMonth = document.querySelector(".current-month");
const prevMonthBtn = document.querySelector(".prev-month-button");
const nextMonthBtn = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
let currentDate = new Date();

dateButton.addEventListener("click", e => {
	datePicker.classList.toggle("show");
	const selectedDate = fromUnixTime(dateButton.dataset.selectedDate);
	currentDate = selectedDate;
	setupDatePicker(selectedDate);
});

function setDate(date) {
	dateButton.innerText = format(date, "MMMM do, yyyy");
	dateButton.dataset.selectedDate = getUnixTime(date);
}

nextMonthBtn.addEventListener("click", e => {
	currentDate = addMonths(currentDate, 1);
	const selectedDate = fromUnixTime(dateButton.dataset.selectedDate);
	setupDates(selectedDate);
});

prevMonthBtn.addEventListener("click", e => {
	currentDate = subMonths(currentDate, 1);
	const selectedDate = fromUnixTime(dateButton.dataset.selectedDate);
	setupDates(selectedDate);
});

function setupDatePicker(selectedDate) {
	currentMonth.innerText = format(currentDate, "MMMM - yyyy");
	setupDates(selectedDate);
}

function setupDates(selectedDate) {
	const firstWeekStart = startOfWeek(startOfMonth(currentDate));
	const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
	const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
	dateGrid.innerHTML = "";

	dates.forEach(date => {
		const dateElement = document.createElement("button");
		dateElement.classList.add("date");
		dateElement.innerText = date.getDate();
		if (!isSameMonth(date, currentDate)) {
			dateElement.classList.add("date-picker-other-month-date");
		}
		if (isSameDay(date, selectedDate)) {
			dateElement.classList.add("selected");
		}
        
		dateElement.addEventListener("click", () => {
			setDate(date);
			datePicker.classList.remove("show");
		});

		dateGrid.appendChild(dateElement);
	});
}

setDate(new Date());
