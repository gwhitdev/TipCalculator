'use strict';

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
const getBillAmount = () => {
    const n = document.getElementById('input-total').value;
    return Number(n);
};
const getNumberOfPeople = () => {
    const n = document.getElementById('input-persons').value;
    console.log('Number of people:',n);
    return Number(n);
};
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

buttons.addEventListener('click', event => {
    setPercent(event);
    updateTotalsToPay(getPercent());
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
