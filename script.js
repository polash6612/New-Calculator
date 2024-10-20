const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    // Only proceed if a button is clicked
    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (currentInput === '') return; // Prevent operator without a number
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            break;
        case '=':
            if (previousInput === '' || currentInput === '') return; // Prevent '=' without both operands
            try {
                currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
            } catch (error) {
                currentInput = 'Error'; // In case of invalid evaluation
            }
            operator = '';
            previousInput = '';
            break;
        case 'all-clear':
            currentInput = '';
            previousInput = '';
            operator = '';
            break;
        default:
            currentInput += value; // Append clicked value to current input
            break;
    }

    screen.value = currentInput || '0'; // Display the current input or 0 if empty
});
