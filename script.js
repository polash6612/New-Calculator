const screen = document.getElementById('screen');
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
});

function handleDigit(digit) {
    // If we are waiting for the second operand, reset the screen
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        // Prevent multiple decimal points
        if (digit === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
}

function handleOperator(nextOperator) {
    if (nextOperator === 'all-clear') {
        resetCalculator();
        return;
    }

    // If an operator is selected and no second operand is entered, do nothing
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    // When an operator is clicked, calculate the result if applicable
    if (previousInput === '') {
        previousInput = currentInput;
    } else if (operator) {
        const result = calculate(previousInput, operator, currentInput);
        currentInput = String(result);
        previousInput = currentInput;
    }

    operator = nextOperator;

    // Set flag to wait for the next number input (second operand)
    waitingForSecondOperand = true;

    // If equal sign is clicked, reset the operator
    if (nextOperator === '=') {
        operator = '';
    }
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

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    waitingForSecondOperand = false;
}
