const display = document.querySelector(".output");
const controls = document.querySelector(".controls");
let lastVal = "";
let currentVal = "";
let operation = "";
let flag = false;

function calculate(operation) {
	switch (operation) {
		case "+":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseInt(lastVal) + parseInt(currentVal);
			}
			if (lastVal === "" && currentVal != "") {
				lastVal = currentVal;
			}
			currentVal = "";

			flag = false;
			break;

		case "-":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseInt(lastVal) - parseInt(currentVal);
			}
			if (lastVal === "" && currentVal != "") {
				lastVal = currentVal;
			}
			currentVal = "";

			flag = false;
			break;

		case "*":
			if (lastVal !== "" && currentVal !== "") {
				lastVal = parseInt(lastVal) * parseInt(currentVal);
			}
			if (lastVal === "" && currentVal != "") {
				lastVal = currentVal;
			}
			currentVal = "";
			flag = false;
			break;
		case "/":
			if (lastVal !== "" && currentVal !== "") {
				if (currentVal == 0) {
					alert("cannot divide by 0");
				} else lastVal = parseInt(lastVal) / parseInt(currentVal);
			}
			if (lastVal === "" && currentVal != "") {
				lastVal = currentVal;
			}
			currentVal = "";
			flag = false;
			break;
		default:
			console.log("error");
	}
}

controls.addEventListener("click", ({ target }) => {
	if (target.classList.contains("number")) {
		currentVal += target.value;
		display.innerText += target.value;
		flag = true;
	}
	if (target.classList.contains("operation") && flag) {
		display.innerText += target.value;
		switch (target.value) {
			case "+":
				calculate(operation === "" ? target.value : operation);
				operation = target.value;
				display.innerText = `${lastVal}${operation}`;
				break;

			case "-":
				calculate(operation === "" ? target.value : operation);
				operation = target.value;
				display.innerText = `${lastVal}${operation}`;
				break;

			case "*":
				calculate(operation === "" ? target.value : operation);
				operation = target.value;
				display.innerText = `${lastVal}x`;
				break;

			case "/":
				calculate(operation === "" ? target.value : operation);
				operation = target.value;
				display.innerText = `${lastVal}${operation}`;
				break;

			case "=":
				calculate(operation === "" ? target.value : operation);
				flag = true;
				display.innerText = lastVal;
				break;

			default:
				break;
		}
	}
	if (target.value === "clear") {
		currentVal = "";
		lastVal = "";
		operation = "";
		flag = false;
		display.innerText = "";
	}
    if(target.value === "delete") {
        currentVal = currentVal.slice(0, currentVal.length-1);
        display.innerText = display.innerText.slice(0, display.innerText.length-1);
        if(display.innerText === ""){
            flag = false;
            operation = "";
            lastVal = "";
        }
        console.log(currentVal);
    }
});
