const display = document.querySelector(".output");
const controls = document.querySelector(".controls");
const decimal = document.querySelector(".decimal");
let lastVal = "";
let currentVal = "";
let operation = "";
let opFlag = false;
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operations = ["+", "-", "*", "/"];

// helper functions
function calculate(operation) {
	switch (operation) {
		case "+":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseFloat(lastVal) + parseFloat(currentVal);
			}
			break;

		case "-":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseFloat(lastVal) - parseFloat(currentVal);
			}
			break;

		case "*":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseFloat(lastVal) * parseFloat(currentVal);
			}
			break;

		case "/":
			if (lastVal !== "" && currentVal !== "") {
				if (currentVal == 0) {
					alert("cannot divide by 0");
				} else lastVal = parseFloat(lastVal) / parseFloat(currentVal);
			}
			break;

		default:
			console.log("error");
	}
	if (lastVal === "" && currentVal != "") {
		lastVal = currentVal;
	}
	currentVal = "";
	opFlag = false;
}

function updateCurrentVal(val) {
	currentVal += val;
	display.innerText += `${val}`;
	opFlag = true;
}

function performOperation(choice) {
	if (operations.includes(choice)) {
		calculate(operation === "" ? choice : operation);
		operation = choice;
		display.innerHTML = `${lastVal}${operation}`;
	} else {
		if (lastVal !== "") {
			calculate(operation === "" ? choice : operation);
			opFlag = true;
			display.innerText = lastVal;
		}
	}
}

function edit() {
	const text = display.innerText;
	if (nums.includes(text[text.length - 1])) {
		currentVal = currentVal.slice(0, currentVal.length - 1);
	}
	if (operations.includes(text[text.length - 1])) {
		operation = "";
		opFlag = true;
	}
	if (text[text.length - 1] === ".") {
		decimal.disabled = false;
		currentVal = currentVal.slice(0, currentVal.length - 1);
	}
	display.innerText = display.innerText.slice(0, text.length - 1);
	if (display.innerText === "") {
		clearDisplay();
	}
}

function clearDisplay() {
	currentVal = "";
	lastVal = "";
	operation = "";
	opFlag = false;
	display.innerText = "";
	decimal.disabled = false;
}
// this function is copied and i have no idea how it works lol :)
function setEndOfContenteditable(contentEditableElement) {
	var range, selection;
	if (document.createRange) {
		//Firefox, Chrome, Opera, Safari, IE 9+
		range = document.createRange(); //Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
		range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection(); //get the selection object (allows you to change selection)
		selection.removeAllRanges(); //remove any selections already made
		selection.addRange(range); //make the range you have just created the visible selection
	} else if (document.selection) {
		//IE 8 and lower
		range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
		range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
		range.select(); //Select the range (make it the visible selection
	}
}

// Event Listeners
controls.addEventListener("click", ({ target }) => {
	if (target.classList.contains("number") || target.value === ".") {
		updateCurrentVal(target.value);
		if (target.value === ".") decimal.disabled = true;
	}
	if (target.classList.contains("operation") && opFlag) {
		performOperation(target.value);
		decimal.disabled = false;
	}
	if (target.value === "clear") {
		clearDisplay();
	}
	if (target.value === "delete") {
		edit();
	}
});

display.addEventListener("keydown", (e) => {
	e.preventDefault();
	if (nums.includes(e.key) || e.key === ".") {
		updateCurrentVal(e.key);
	}
	if ((operations.includes(e.key) || e.key === "Enter") && opFlag) {
		performOperation(e.key);
	}
	if (e.key === "Backspace") {
		edit();
	}
	if (e.key === "Backspace" && e.ctrlKey) {
		clearDisplay();
	}
	setEndOfContenteditable(display);
});
