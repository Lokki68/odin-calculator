let displayValue = '0'
let firstOperand = null
let secondOperand = null
let firstOperator = null
let secondOperator = null
let result = null

const buttons = document.querySelectorAll('button')

console.log(buttons);

window.addEventListener('keydown', function(e) {
  const key = document.querySelector(`button[data-key='${e.keyCode}']`)
  key.click()
})

function updateDisplay() {
  const display = document.querySelector('#display')
  display.innerText = displayValue

  if(displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9)
  }
}

updateDisplay()

function clickButton() {
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log(buttons[i]);
      if (buttons[i].classList.contains('operand')) {
        inputOperand(buttons[i].value)
      } else if (buttons[i].classList.contains('operator')) {
        inputOperator(buttons[i].value)
      } else if (buttons[i].classList.contains('equals')) {
        inputEquals()
      } else if (buttons[i].classList.contains('decimal')) {
        inputDecimal(buttons[i].value)
      } else if (buttons[i].classList.contains('percent')) {
        inputPercent(displayValue)
      } else if (buttons[i].classList.contains('sign')) {
        inputSign(displayValue)
      } else if (buttons[i].classList.contains('clear')) {
        clearDisplay()
      }
  
      updateDisplay()
    })
  }
}

clickButton()

function inputOperand(operand) {
  if(firstOperator === null) {
    if(displayValue == 0) {
      displayValue = operand
    } else if (displayValue === firstOperand) {
      displayValue = operand
    } else {
      displayValue += operand
    }
  } else {
    if (displayValue === firstOperand) {
      displayValue = operand
    } else {
      displayValue += operand
    }
  }
}

function inputOperator(operator) {
  if (firstOperator != null && secondOperator === null) {
    secondOperator = operator
    secondOperand = displayValue
    result = operate(Number(firstOperand), Number(secondOperand), firstOperator)
    displayValue = roundAccurately(result, 15).toString()
    firstOperand = displayValue
    result = null
  } else if (firstOperator != null && secondOperator != null) {
    secondOperand = displayValue
    result = operate(Number(firstOperand), Number(secondOperand), secondOperator)
    secondOperator = operator
    displayValue = roundAccurately(result, 15).toString()
    firstOperand = displayValue
    result = null
  } else {
    firstOperator = operator
    firstOperand = displayValue
  }
}

function inputEquals() {
  if(firstOperator === null) {
    displayValue = displayValue;
} else if(secondOperator != null) {
    secondOperand = displayValue;
    result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
    if(result === 'lmao') {
        displayValue = 'lmao';
    } else {
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
} else {
    secondOperand = displayValue;
    result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
    if(result === 'lmao') {
        displayValue = 'lmao';
    } else {
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}
}

function inputDecimal(dot) {
  if(displayValue === firstOperand || displayValue === secondOperand) {
    displayValue = '0'
    displayValue += dot
  } else if (!displayValue.includes(dot)) {
    displayValue += dot
  }
}

function inputPercent(num) {
  displayValue = (num/100).toString()
}

function inputSign(num) {
  displayValue = (num * -1).toString()
}

function clearDisplay() {
  let displayValue = '0'
  let firstOperand = null
  let secondOperand = null
  let firstOperator = null
  let secondOperator = null
  let result = null
}

function inputBackspace() {
  if(firstOperand != null) {
    firstOperand = null;
    updateDisplay()
  }
}

function operate(num1, num2, op) {

  if(op === '+') {
    return num1 + num2
  } else if (op === '-') {
    return num1 - num2
  } else if (op === '*') {
    return num1 * num2
  } else if (op === '/') {
    if(num2 === 0) {
      return 'lmao'
    } else {
      return num1 / num2
    }
  }

}

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + 'e' + places ) + 'e-' + places)
}