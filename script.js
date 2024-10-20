const screen = document.getElementById('screen');    // For displaying current input or result
const equationDisplay = document.getElementById('equation');  // For displaying the ongoing equation
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';    // Current input on the screen
let previousInput = '';    // Previous input before the operator
let operator = '';         // Operator selected
let waitingForSecondOperand = false; // Flag for when the second operand is awaited

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    // Ensure a button was clicked
    if (!target.matches('button')) return;

    // Handle digit and decimal input
    if (!isNaN(value) || value === '.') {
        handleDigit(value);
    } 
    // Handle operator input (+, -, *, /, =, AC)
    else {
        handleOperator(value);
    }

    screen.value = currentInput;
    updateEquationDisplay();  // Update the equation display with each click
});

function handleDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        if (digit === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
}

function handleOperator(nextOperator) {
    if (nextOperator === 'all-clear') {
        resetCalculator();
        return;
    }

    if (nextOperator === '=') {
        if (operator && previousInput !== '') {
            currentInput = String(calculate(previousInput, operator, currentInput));
            operator = '';
            previousInput = '';
        }
        waitingForSecondOperand = true;
        return;
    }

    // If there's an existing operator and input, calculate before assigning new operator
    if (operator && previousInput !== '') {
        currentInput = String(calculate(previousInput, operator, currentInput));
    }

    previousInput = currentInput;
    operator = nextOperator;
    waitingForSecondOperand = true;
}

function calculate(firstOperand, operator, secondOperand) {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    if (isNaN(first) || isNaN(second)) return;

    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;
        default:
            return second;
    }
}

function updateEquationDisplay() {
    // Update the equation display only when there's a previous input and operator
    if (previousInput && operator) {
        equationDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
    } else {
        equationDisplay.textContent = currentInput;  // Show current input by default
    }
}

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    waitingForSecondOperand = false;
    equationDisplay.textContent = '';  // Clear the equation display
}
