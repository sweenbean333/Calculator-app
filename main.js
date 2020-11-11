const previousDisplay = document.querySelector('#previous');
const currentDisplay = document.querySelector('#current');
const deleteNum = document.querySelector('[data-del]');
const clr = document.querySelector('[data-clear]');
const operations = document.querySelectorAll('[data-operation]');
const numbers = document.querySelectorAll('[data-number]');
const equalsBtn = document.querySelector('[data-equals]')


let sign; //variable to keep track of what operation is being used
let result; //keeps track of the answer from the calculation


//Add event listeners for all buttons
clr.addEventListener('click', clearDisplay);

numbers.forEach(number => {
    number.addEventListener('click', appendNumber);
});

deleteNum.addEventListener('click', deleteNumber);

equalsBtn.addEventListener('click', () => {
    if(previousDisplay.innerHTML == '') {
        return
    }
    calculate()
    currentDisplay.innerHTML = result;
    previousDisplay.innerHTML = '';
    sign = '';
});

operations.forEach(operation  => {
    operation.addEventListener('click', chooseOperation);
});

//Functions 
function clearDisplay() {

    currentDisplay.innerHTML = '0';
    previousDisplay.innerHTML = '';
};
//Deletes the last number of the current number
function deleteNumber() {
    if(currentDisplay.innerHTML.length === 1) {
        currentDisplay.innerHTML = '0';
    } else if(previousDisplay.innerHTML !== ''){
        return
    }else if(sign === ''){
        return
    }else {
        currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
    }
};  
//Decides which # is pressed and appends it to the end
function appendNumber(number) {
    
    if(number.target.innerHTML == '.' && currentDisplay.innerHTML.includes('.')){
        return; //assures that only one decimal point can be placed
    } else if(currentDisplay.innerHTML == '0' && number.target.innerHTML == '0') {
        return; //If zero is the only # displayed, no more zeroes will be appended
    } else if(currentDisplay.innerHTML == '0' && number.target.innerHTML == '.') {
        currentDisplay.innerHTML = currentDisplay.innerHTML.concat(number.target.innerHTML);
    } else if(currentDisplay.innerHTML == '0' && number.target.innerHTML !== '.'){
        currentDisplay.innerHTML = number.target.innerHTML;
    } else {
        currentDisplay.innerHTML = currentDisplay.innerHTML.concat(number.target.innerHTML);
        
    }
}

//Splits the # into integers and decimal #s to allow #s in thousands and millions to read e.g. 9,999,999 instead of 9999999
//I coded this out because it doesn't work right. Only goes to 1,000 and then if I press another # it resets back to a single digit
/*
function displayNumber(number) {
    const numberToString = (number).toString();
    const integers = parseFloat(numberToString.split('.')[0]);
    const decimals = numberToString.split('.')[1];
    let display;

    if(isNaN(integers)) {
        display = '';
    } else {
        display = integers.toLocaleString('en');
    }
    if (decimals != null) {
        return `${display}.${decimals}`;
    } else {
        return display
    }

   
};
*/
//Allows the calculation to be performed of the two numbers displayed
function calculate() {
    const previous = parseFloat(previousDisplay.innerHTML);
    const current = parseFloat(currentDisplay.innerHTML);
    
    switch(sign) {
        case 'x':
          result = +(previous * current).toFixed(6)
          break;
        case '÷':
            result = +(previous / current).toFixed(6)
            break;

        case '+':
            result = +(previous + current).toFixed(6)
            break;
        case '-':
            result = +(previous - current).toFixed(6)
            break;
        default:
            return
    }   
}

function chooseOperation(e){
     
    if(previousDisplay.innerHTML === '') {
        sign = e.target.innerHTML;
        previousDisplay.innerHTML = `${currentDisplay.innerHTML} ${sign}`;
        currentDisplay.innerHTML = '';
        
    } else if(previousDisplay.innerHTML !== '' && currentDisplay.innerHTML !== '') {
        calculate()
        currentDisplay.innerHTML = '';
        sign = e.target.innerHTML
        previousDisplay.innerHTML = `${result} ${sign}`;
    }  
}


