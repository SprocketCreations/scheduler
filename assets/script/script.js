// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const BLOCKS = [];
$(function () {

	const TIME_BLOCK_CONTAINER = document.querySelector("#time-block-container");
	const TIME_BLOCK_TEMPLATE = document.querySelector("#time-block-template");
	const CURRENT_DATE = document.querySelector("#current-day");

	const HOUR_LABELS = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

	const getTimeData = time => {
		const data = localStorage.getItem(HOUR_LABELS[time]);
		return data == null ? {text: ""} : JSON.parse(data);
	};

	const setTimeData = (time, data) => {
		localStorage.setItem(HOUR_LABELS[time], JSON.stringify({
			text: data,
		}));
	};

	const addTimeBlock = (time, cssClass) => {
		const frag = TIME_BLOCK_TEMPLATE.content.cloneNode(true);
		const root = frag.querySelector("#hour-");
		root.setAttribute ("id", `hour-${time}`);
		root.querySelector("div").innerHTML = HOUR_LABELS[time];
		const textArea = root.querySelector("textarea");
		textArea.value = getTimeData(time).text;
		root.classList.add(cssClass);
		root.querySelector("button").addEventListener("click", function() {
			// Save button pressed
			setTimeData(time, textArea.value);

		});
		TIME_BLOCK_CONTAINER.appendChild(frag);
		BLOCKS.push(root);
	};

	const hour = dayjs().hour();
	for(let i = 0; i < 24; ++i)
	{
		let cssClass = "past";
		if(hour == i) {cssClass = "present";}
		else if( i > hour) {cssClass = "future";}
		
		addTimeBlock(i, cssClass)
	}

	CURRENT_DATE.textContent = dayjs().format("MMMM DD, YYYY");
});
