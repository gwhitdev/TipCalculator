function $ (element,type='#') {
    if(type === '#')return document.getElementById(element);
    if(type === 'c') return document.getElementsByClassName(element);
}
const customInput = $('customInput');
const buttons = $('buttons');
const peopleInput = $('input-persons');
const billAmount = $('input-total');
const numberOfPeople = $('input-persons');
const displayTipPerPerson = $('tip-amount');
const displayAmountPerPerson = $('amount-amount');
const resetButton = $('reset-button');

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

const getPercent = () => percent;
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
function changeLastButton() {
    lastButton.classList.toggle('active');
}
function customClick() {
    customInput.type = 'number';
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

// EVENTS
buttons.addEventListener('click', event => {
    if(lastButton != '' && lastButton != event.target) changeLastButton();
    event.target.classList.toggle('active');
    setPercent(event);
    updateTotalsToPay(getPercent());
    lastButton = event.target;
})
peopleInput.addEventListener('change', () => updateTotalsToPay(getPercent()));
customInput.addEventListener('click', customClick);
customInput.addEventListener('keyup',readCustom);
resetButton.addEventListener('click', () => {
    resetValues();
    resetButtons();
    resetDisplays();
    resetCustom();
});