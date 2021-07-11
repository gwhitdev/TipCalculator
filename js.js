function $ (element,type='#') {
    if(type === '#')return document.getElementById(element);
    if(type === 'c') return document.getElementsByClassName(element);
}

const buttons = document.getElementById('buttons');
const peopleInput = document.getElementById('input-persons');
const percentValues = {
    'five':5,
    'ten':10,
    'fifteen':15,
    'twentyfive':25,
    'fifty':50,
}
const billAmount = $('input-total');
const getBillAmount = () => {
    const n = billAmount.value;
    return Number(n);
};
const setBillAmount = (v) => billAmount.value = v;

const numberOfPeople = $('input-persons');
const getNumberOfPeople = () => {
    const n = numberOfPeople.value;
    console.log('Number of people:',n);
    return Number(n);
};
const setNumberOfPeople = (v) => numberOfPeople.value = v;

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

const displayTipPerPerson = document.getElementById('tip-amount');
const displayAmountPerPerson = document.getElementById('amount-amount');

function changeTipPerPerson(tip) {
    displayTipPerPerson.innerText = tip;
}
function changeAmountPerPerson(amount) {
    displayAmountPerPerson.innerText = amount;
}

let percent = 0;

function getPercent() {
    return percent;
}

function setPercent(event) {
    percent = percentValues[event.target.attributes.percent.value];
    return percent;
}

function updateTotalsToPay(percent) {
    console.log('triggered');
    const tipAmount = sumTipAmount(getBillAmount(),percent);  
    const total = sumTotal(getBillAmount(),tipAmount);
    const amountPerPerson = sumAmountPerPerson(getNumberOfPeople(),total);
    const tipEachPerson = tipPerPerson(tipAmount,getNumberOfPeople());
    changeTipPerPerson(tipEachPerson);
    changeAmountPerPerson(amountPerPerson);
}

peopleInput.addEventListener('change', function() {
    updateTotalsToPay(getPercent());
    }
)
let lastButton ='';
function changeLastButton() {
    lastButton.classList.toggle('active');
}
buttons.addEventListener('click', event => {
    if(lastButton != '' && lastButton != event.target) {
        changeLastButton();
    }
    event.target.classList.toggle('active');
    setPercent(event);
    updateTotalsToPay(getPercent());
    lastButton = event.target;
})

const customInput = $('customInput');
function customClick() {
    
    customInput.type = 'number';
}

function readCustom() {
    const val = customInput.value;
    percent = Number(val);
    console.log(percent);
    updateTotalsToPay(percent);
}
customInput.addEventListener('click', customClick);
customInput.addEventListener('keyup',readCustom);

const resetButton = $('reset-button');

function resetValues() {
    setBillAmount('0.00');
    setNumberOfPeople(1);
}

resetButton.addEventListener('click', resetValues);