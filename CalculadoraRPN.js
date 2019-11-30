class RPNCalculator {

    constructor() {
        this.maxStackSize = 3;
        this.stack = new Array();
        this.memoryRegister = 0;
        this.justPushed = false;
    }

    // Clear functions
    // ------------------------------------------------------------------------

    clearStack() {
        this.clearDisplay();
        this.stack = new Array();
    }

    clearStackDisplay() {
        var baseName = "displayBox";
        for (var i = 1; i < 4; i++) {
            document.getElementById(baseName + i).value = "0";
        }
    }

    clearDisplay() {
        this.clearStackDisplay();
        this.clearLastDisplay();
    }

    clearLastDisplay() {
        document.getElementById("displayBox0").value = "0";
    }

    deleteLastInput() {
        var display = document.getElementById("displayBox0");
        var contents = display.value;
        if (contents != "0" || contents != "") {
            contents = contents.substring(0, contents.length - 1);
        }
        display.value = contents == "" ? "0" : contents;
    }

    // Memory functions
    // ------------------------------------------------------------------------

    addToMemory() {
        this.memoryRegister += Number(document.getElementById("displayBox0").value);
        this.justPushed = true;
    }

    subtractFromMemory() {
        this.memoryRegister -= Number(document.getElementById("displayBox0").value);
        this.justPushed = true;
    }

    clearMemory() {
        this.memoryRegister = "0";
    }

    saveToMemory() {
        this.memoryRegister = Number(document.getElementById("displayBox0").value);
        this.justPushed = true;
    }

    readMemory() {
        document.getElementById("displayBox0").value = this.memoryRegister;
        this.justPushed = true;
    }

    // Basic functions
    // ------------------------------------------------------------------------

    swapTwoLastElements() {
        var topStack = this.stack.pop();
        if (topStack !== undefined) {
            var newStackTop = document.getElementById("displayBox0").value;
            this.stack.push(newStackTop);
            document.getElementById("displayBox0").value = topStack;
        } else {
            document.getElementById("displayBox0").value = "0";
        }
        this.displayStack();
        this.justPushed = true;
    }

    popStack() {
        var topStack = this.stack.pop();
        document.getElementById("displayBox0").value = topStack === undefined ? "0" : topStack;
        this.displayStack();
        this.justPushed = true;
    }

    displayStack() {
        var baseName = "displayBox";
        var counter = 1;
        this.clearStackDisplay();
        for (var i = this.stack.length - 1; i >= 0; i--) {
            var newValue = this.stack[i] === undefined ? "0" : this.stack[i];
            document.getElementById(baseName + (counter++)).value = newValue;
        }
    }

    writeNumber(number) {
        var display = document.getElementById("displayBox0");
        if (this.justPushed) {
            display.value = number;
            this.justPushed = false;
        } else if (display.value == "0") {
            display.value = number;
        } else {
            display.value += number;
        }
    }

    toggleSign() {
        var display = document.getElementById("displayBox0");
        if (display.value.substring(0, 1) != "-") {
            display.value = "-" + display.value;
        } else {
            display.value = display.value.substring(1, display.value.length);
        }
    }

    basicOperation(operation) {
        var supportedOperations = new Array('+', '-', '*', '/');
        if (supportedOperations.find(param => param.localeCompare(operation) == 0)) {
            var operand1 = document.getElementById("displayBox0").value;
            var operand2 = this.stack.pop();
            this.displayStack();
            this.justPushed = true;
            this.writeNumber(eval("Number(operand1)" + operation + "Number(operand2)"));
            this.justPushed = true;
        }
    }

    add() { this.basicOperation('+') }
    subtract() { this.basicOperation('-') }
    divide() { this.basicOperation('/') }
    multiply() { this.basicOperation('*') }

    basicMathOperation(operation) {
        var supportedOperations = new Array('sin', 'cos', 'tan', 'sqrt');
        if (supportedOperations.find(param => param.localeCompare(operation) == 0)) {
            var operand1 = document.getElementById("displayBox0").value;
            this.justPushed = true;
            this.writeNumber(eval("Math." + operation + "(" + operand1 + ")"));
            this.justPushed = true;
        }
    }

    sin() { this.basicMathOperation("sin"); }
    cos() { this.basicMathOperation("cos"); }
    tan() { this.basicMathOperation("tan"); }
    sqrt() { this.basicMathOperation("sqrt"); }

    powerOperation(power) {
        var base = document.getElementById("displayBox0").value;
        this.displayStack();
        this.justPushed = true;
        this.writeNumber(Math.pow(base, power));
        this.justPushed = true;
    }

    exponentialPower() {
        var base = document.getElementById("displayBox0").value;
        var power = this.stack.pop();
        this.displayStack();
        this.justPushed = true;
        this.writeNumber(Math.pow(base, power));
        this.justPushed = true;
    }

    enter() {
        if (this.stack.length >= this.maxStackSize) {
            var newStack = new Array();
            for (var i = 1; i < this.stack.length; i++) {
                newStack.push(this.stack[i]);
            }
            newStack.push(document.getElementById("displayBox0").value);
            this.stack = newStack;
        } else {
            this.stack.push(document.getElementById("displayBox0").value);
        }
        this.displayStack();
        this.justPushed = true;
    }

}

const calculator = new RPNCalculator();