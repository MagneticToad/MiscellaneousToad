var numberPermutations = [];
var operatorPermutations = [];

//constants
const BRACKET_TYPE_SEPARATE = 0; // 		(a ? b) ? (c ? d)
const BRACKET_TYPE_RIGHT_RIGHT = 1; //	((a ? b) ? c) ? d
const BRACKET_TYPE_RIGHT_LEFT = 2; // 	a ? ((b ? c) ? d)
const BRACKET_TYPE_LEFT_RIGHT = 3; //  	(a ? (b ? c)) ? d
const BRACKET_TYPE_LEFT_LEFT = 4; // 		a ? (b ? (c ? d))

const OPERATORS = ["+", "-", "*", "/"];

var primed = false;
var primedSolutions = [];

function inputChange() {
	setDisplayText("");
	primedSolutions = [];
	primed = false;
}

function buttonPress() {
	if (primed) {
		showPrimedSolutions();
	} else {
		var input = document.getElementById("numbersinput").value
		
		if (input.match(/[0-9]{4}/) == input) {	
			findSolutions(input);
		} else {
			setDisplayText("Must enter 4 numbers")
		}
	}
}

function showPrimedSolutions() {
	setDisplayText("");
	for (var x of primedSolutions) {
		addDisplayText(x);
	}
	let solutions = document.getElementById("solutions");
	solutions.removeChild(solutions.lastChild);
}

function setDisplayText(text) {
	document.getElementById("solutions").innerHTML = text;
}

function addDisplayText(text) {
	document.getElementById("solutions").innerHTML += text + "<br>";
}

function findSolutions(numbers) {
	setDisplayText("");
	numberPermutations = [];
	
	var bracketType = 0;
	
	var solutionString;
	
	var solutions = [];
	
	if (operatorPermutations.length == 0) {
		createOperatorPermutations();
	}		
	
	permute(numbers, 0, 3);
	for (var numberPermutation of numberPermutations) {
		for (var operatorPermutation of operatorPermutations) {
			for (var bracketTyping = 0; bracketTyping < 5; bracketTyping++) {
				if (evaluateAttempt(numberPermutation, operatorPermutation, bracketTyping) == 10) {
					solutionString = createSolutionString(numberPermutation, operatorPermutation, bracketTyping)
					if (solutions.indexOf(solutionString) == -1) {
						solutions.push(solutionString);
					}
				}
			}
		}
	}
	
	if (solutions.length == 0) {
		setDisplayText("There are no solutions.");
	} else {
		primed = true;
		setDisplayText("");
		addDisplayText("There is at least one solution.");
		addDisplayText("Press solve again to show.");
		for (var x of solutions) {
			primedSolutions.push(x);
		}
	}
}

function permute(string, start, end) {
	if (start == end) {
		numberPermutations.push(string);
	} else {
		for (var x = start; x <= end; x++) {
			string = swap(string, start, x);
			permute(string, start+1, end);
			string = swap(string, start, x);
		}
	}
}

function swap(string, index1, index2) {
	if (index1 == index2) {
		return string;
	} else {
		if (index1 > index2) {
			var temp = index1;
			index1 = index2;
			index2 = temp;
		}
		return string.slice(0, index1) + string.charAt(index2) + string.slice(index1 + 1, index2) + string.charAt(index1) + string.slice(index2 + 1, string.length);
	}
}

function createOperatorPermutations() {
	for (var a = 0; a < 4; a++) {
		for (var b = 0; b < 4; b++) {
			for (var c = 0; c < 4; c++) {
				operatorPermutations.push([OPERATORS[a], OPERATORS[b], OPERATORS[c]]);
			}				
		}
	}
}

function evaluateAttempt(numbers, operators, bracketType) {
	var numbersInts = [];
	for (x of numbers) {
		numbersInts.push(parseInt(x));
	}
	
	var part1;
	var part2;
	
	try {
		switch(bracketType) {
			case BRACKET_TYPE_SEPARATE:
				part1 = performOperation(numbersInts[0], numbersInts[1], operators[0]);
				part2 = performOperation(numbersInts[2], numbersInts[3], operators[2]);
				return performOperation(part1, part2, operators[1]);
				break;
			case BRACKET_TYPE_RIGHT_RIGHT:
				part1 = performOperation(numbersInts[0], numbersInts[1], operators[0]);
				part2 = performOperation(part1, numbersInts[2], operators[1]);
				return performOperation(part2, numbersInts[3], operators[2]);
				break;
			case BRACKET_TYPE_RIGHT_LEFT:
				part1 = performOperation(numbersInts[1], numbersInts[2], operators[1]);
				part2 = performOperation(part1, numbersInts[3], operators[2]);
				return performOperation(numbersInts[0], part2, operators[0])
				break;
			case BRACKET_TYPE_LEFT_RIGHT:
				part1 = performOperation(numbersInts[1], numbersInts[2], operators[1]);
				part2 = performOperation(numbersInts[0], part1, operators[0]);
				return performOperation(part2, numbersInts[3], operators[2]);
				break;
			case BRACKET_TYPE_LEFT_LEFT:
				part1 = performOperation(numbersInts[2], numbersInts[3], operators[2]);
				part2 = performOperation(numbersInts[1], part1, operators[1])
				return performOperation(numbersInts[0], part2, operators[0]);
				break;
		}
	} catch(err) {
		return; //div by 0
	}
}

function performOperation(number1, number2, operation) {
	switch(operation) {
		case "+":
			return number1 + number2;
			break;
		case "-":
			return number1 - number2;
			break;
		case "*":
			return number1 * number2;
			break;
		case "/":
			if (number2 == 0) {
				throw "Division by 0";
			} else {
				return number1 / number2;
			}
	}
}

function createSolutionString(numbers, operators, bracketType) {
	switch(bracketType) {
		case BRACKET_TYPE_SEPARATE:
			return "(" + numbers.charAt(0) + " " + operators[0] + " " + numbers.charAt(1) + ")" + " " + operators[1] + " " + "(" + numbers.charAt(2) + " " + operators[2] + " " + numbers.charAt(3) + ")"
			break;
		case BRACKET_TYPE_RIGHT_RIGHT:
			return "((" + numbers.charAt(0) + " " + operators[0] + " " + numbers.charAt(1) + ")" + " " + operators[1] + " " + numbers.charAt(2) + ") " + operators[2] + " " + numbers.charAt(3)
			break;
		case BRACKET_TYPE_RIGHT_LEFT:
			return numbers.charAt(0) + " " + operators[0] + " ((" + numbers.charAt(1) + " " + " " + operators[1] + " " + "" + numbers.charAt(2) + ") " + operators[2] + " " + numbers.charAt(3) + ")"
			break;
		case BRACKET_TYPE_LEFT_RIGHT:
			return "(" + numbers.charAt(0) + " " + operators[0] + " (" + numbers.charAt(1) + " " + " " + operators[1] + " " + "" + numbers.charAt(2) + ")) " + operators[2] + " " + numbers.charAt(3)
			break;
		case BRACKET_TYPE_LEFT_LEFT:
			return numbers.charAt(0) + " " + operators[0] + " (" + numbers.charAt(1) + " " + operators[1] + " " + "(" + numbers.charAt(2) + " " + operators[2] + " " + numbers.charAt(3) + "))"
			break;
	}
}