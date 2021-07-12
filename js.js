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
    displayTipPerPerson.innerText = tip;
}
function changeAmountPerPerson(amount) {
    displayAmountPerPerson.innerText = amount;
}
function updateTotalsToPay(percent) {
    console.log(percent);
    const tipAmount = sumTipAmount(getBillAmount(),percent);  
    const total = sumTotal(getBillAmount(),tipAmount);
    const amountPerPerson = sumAmountPerPerson(getNumberOfPeople(),total);
    const tipEachPerson = tipPerPerson(tipAmount,getNumberOfPeople());
    changeTipPerPerson(tipEachPerson);
    changeAmountPerPerson(amountPerPerson);
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
    lastButton.classList.toggle('active');
    lastButton = '';
    
}
function resetDisplays() {
    displayAmountPerPerson.innerText = '0.00';
    displayTipPerPerson.innerText = '0.00';
}
function resetCustom() {
    customInput.type = 'text';
    customInput.value = 'Custom';
}
function changeLastButton() {
    if(lastButton.attributes.id) resetCustom();
    lastButton.classList.toggle('active');
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
    if(event.target.attributes.percent) {
        activateReset(); 
        if(lastButton != '' && lastButton != event.target) changeLastButton();
        event.target.classList.toggle('active');
        setPercent(event);
        updateTotalsToPay(getPercent());
        lastButton = event.target;
}});

peopleInput.addEventListener('change', () => {
    if(personInputValidation() === true ) {
        updateTotalsToPay(getPercent());
    }
    resetDisplays();
});

customInput.addEventListener('click', customClick);
customInput.addEventListener('keyup', readCustom);
resetButton.addEventListener('click', () => {
    resetValues();
    deactivateReset();
    resetButtons();
    resetDisplays();
    resetCustom();
});