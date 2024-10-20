const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            break;
        case '=':
            if (previousInput === '' || currentInput === '') return;
            currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
            operator = '';
            previousInput = '';
            break;
        case 'all-clear':
            currentInput = '';
            previousInput = '';
            operator = '';
            break;
        default:
            currentInput += value;
            break;
    }

    screen.value = currentInput;
});
