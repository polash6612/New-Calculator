const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';  // Initialize with '0'
let previousInput = '';
let operator = '';
let shouldResetScreen = false;  // To track when to reset screen for a new number

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    // Only proceed if a button is clicked
    if (!target.matches('button')) return;

    // Handle number input
    if (!isNaN(value) || value === '.') {
        inputDigit(value);
    } else {
        handleOperator(value);
    }

    screen.value = currentInput;
});

function inputDigit(digit) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = digit;
        shouldResetScreen = false;
    } else {
        currentInput += digit;
    }
}

function handleOperator(nextOperator) {
    if (nextOperator === 'all-clear') {
        resetCalculator();
        return;
    }

    if (nextOperator === '=') {
        if (operator && previousInput !== '') {
            currentInput = String(evaluate(previousInput, operator, currentInput));
            operator = '';
        }
        previousInput = '';
        shouldResetScreen = true;
        return;
    }

    // If an operator is clicked and there's a previous input, perform calculation
    if (operator && previousInput !== '') {
        currentInput = String(evaluate(previousInput, operator, currentInput));
    }

    previousInput = currentInput;
    operator = nextOperator;
    shouldResetScreen = true;
}

function evaluate(first, operator, second) {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);

    if (isNaN(firstNum) || isNaN(secondNum)) return;

    switch (operator) {
        case '+':
            return firstNum + secondNum;
        case '-':
            return firstNum - secondNum;
        case '*':
            return firstNum * secondNum;
        case '/':
            return secondNum !== 0 ? firstNum / secondNum : 'Error';
        default:
            return secondNum;
    }
}

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetScreen = false;
}
