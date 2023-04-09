class Calculator {
    constructor(currentCalculationTextElement, previousCalculationTextElement) {
        this.currentCalculationTextElement = currentCalculationTextElement;
        this.previousCalculationTextElement = previousCalculationTextElement
        this.clear();
    }

    clear() {
        this.currentCalculation = "";
        this.previousCalculation = "";
        this.operation = "";
    }

    updateScreen() {
        if ((typeof this.currentCalculation) === "number") {
            if (this.currentCalculation.toString().length > 13) {
                
            }
        } else if ((typeof this.currentCalculation) === "string") {

        }
        this.currentCalculationTextElement.innerText = this.currentCalculation;
        if (this.operation != null) {
            this.previousCalculationTextElement.innerText = `${this.previousCalculation} ${this.operation}`;
        }
    }

    whichOperation(operation) {
        if (this.currentCalculation === "") {
            return;
        } else if (this.previousCalculation !== "") {
            this.calculate()
        }
        this.operation = operation;
        this.previousCalculation = this.currentCalculation;
        this.currentCalculation = "";
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousCalculation);
        const curr = parseFloat(this.currentCalculation);
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch (this.operation) {
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            case '/':
                calculation = prev / curr;
                break;
            case 'x':
                calculation = prev * curr;
                break;
            case '%':
                calculation = curr * 0.01
                break;
            default:
                return;
        }
        this.currentCalculation = calculation
        this.operation = undefined
        this.previousCalculation = ""
    }

    appendNumber(number) {
        number = number.toString();
        this.currentCalculation = this.currentCalculation.toString();
        if (number === "." && this.currentCalculation.includes(".") || this.currentCalculation.length > 13){
            return;
        }
        this.currentCalculation = this.currentCalculation + number;
    }
 }

const currentCalculationTextElement = document.querySelector("[data-current-calculation]");
const previousCalculationTextElement = document.querySelector("[data-previous-calculation]")
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(currentCalculationTextElement, previousCalculationTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateScreen();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === "=") {
            calculator.calculate();
            calculator.updateScreen();
        }else if (button.innerText === "C") {
            calculator.clear();
            calculator.updateScreen();
        } else {
            calculator.whichOperation(button.innerText);
            calculator.updateScreen();
        }
    })
})