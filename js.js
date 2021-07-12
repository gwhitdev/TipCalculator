import { $ } from './qj.js';
const customInput = $('customInput');
const buttons = $('buttons');
const peopleInput = $('input-persons');
const billAmount = $('input-total');
const numberOfPeople = $('input-persons');
const displayTipPerPerson = $('tip-amount');
const displayAmountPerPerson = $('amount-amount');
const resetButton = $('reset-button');
const errorText = $('error-text');
let percent = 0;
let lastButton = '';

// ENUM
const percentValues = {
    'five':5,
    'ten':10,
    'fifteen':15,
    'twentyfive':25,
    'fifty':50,
}

// GET/SET
const getBillAmount = () => Number(billAmount.value);
const setBillAmount = (v) => billAmount.value = v;

const getNumberOfPeople = () => Number(numberOfPeople.value);
const setNumberOfPeople = (v) => numberOfPeople.value = v;

const getPercent = () => {
    const tempPercent = percent;
    console.log('Temp percent:',tempPercent);
    console.log(typeof(tempPercent));
    if(typeof(tempPercent) != typeof(0)) return 0;
    return tempPercent;
};
const setPercent = (event) => percent = percentValues[event.target.attributes.percent.value];
const setPercentToDefault = () => percent = 0;
// ACTIONS
function sumAmountPerPerson(peopleAmount,subTotal) {
    return subTotal / peopleAmount;
}
function sumTipAmount(billAmount, percent) {
    return (billAmount / 100) * percent;
}
function sumTotal(billAmount,tipAmount) {
    return billAmount + tipAmount;
}
function tipPerPerson(tipAmount, peopleAmount) {
    return tipAmount / peopleAmount;
}
function changeTipPerPerson(tip) {
    return tip.toFixed(2);
}
function changeAmountPerPerson(total) {
    return total.toFixed(2);
}
function updateTotalsToPay(percent) {
    console.log(percent);
    const tipAmount = sumTipAmount(getBillAmount(),percent);  
    const total = sumTotal(getBillAmount(),tipAmount);
    const amountPerPerson = sumAmountPerPerson(getNumberOfPeople(),total);
    const tipEachPerson = tipPerPerson(tipAmount,getNumberOfPeople());
    displayTipPerPerson.innerText = changeTipPerPerson(tipEachPerson);
    displayAmountPerPerson.innerText = changeAmountPerPerson(amountPerPerson);
}
function resetValues() {
    setBillAmount('0.00');
    setNumberOfPeople(1);
}

function makeCustomNum () {
    customInput.type = 'number';
    customInput.value = 0; 
}
function makeCustomText () {
    customInput.type = 'text';
    if(customInput.value != 'Custom') resetCustom();
    customInput.value = '';
}
function customClick() {
    if (customInput.type === 'text') makeCustomNum();
    if (customInput.type === 'number') makeCustomText();
}
function readCustom() {
    const val = customInput.value;
    percent = Number(val);
    console.log(percent);
    updateTotalsToPay(percent);
}
function resetButtons() {
    const btns = Array.from(buttons.childNodes);
    btns.forEach(button => {
        if(button.classList) {
            button.classList.remove('active');
        }
    });
}
function resetDisplays() {
    displayAmountPerPerson.innerText = '0.00';
    displayTipPerPerson.innerText = '0.00';
}
function resetCustom() {
    customInput.type = 'text';
    customInput.value = 'Custom';
}
function activateReset() {
    resetButton.classList.add('reset-active');
}
function deactivateReset() {
    resetButton.classList.remove('reset-active');
}
function personInputValidation() {
    const num = getNumberOfPeople();
    while (num === 0) {
        peopleInput.classList.add('error');
        errorText.style.visibility = 'visible';
        return false;
    }
    peopleInput.classList.remove('error');
    errorText.style.visibility = 'hidden';
    return true;
}      

// EVENTS
buttons.addEventListener('click', event => {
        resetButtons();
        activateReset();
        setPercent(event);
        updateTotalsToPay(getPercent());
        event.target.classList.add('active');
});

peopleInput.addEventListener('change', () => {
    if(personInputValidation() === true ) {
        updateTotalsToPay(getPercent());
    }
    if(personInputValidation() === false) {
        resetDisplays();
    }
});

billAmount.addEventListener('keyup', () => {
    activateReset();
    updateTotalsToPay(getPercent())
    }
);

customInput.addEventListener('click', customClick);
customInput.addEventListener('keyup', readCustom);
resetButton.addEventListener('click', (event) => {
    setPercentToDefault();
    resetValues();
    deactivateReset();
    resetButtons();
    resetDisplays();
    resetCustom();
});