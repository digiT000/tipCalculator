"use strict";

let customTip = document.getElementById("customTip");
let tipSelect = document.getElementsByName("tip");
let billInput = document.getElementById("billValue");
let peopleInput = document.getElementById("numberOfPeople");
let resultTip = document.getElementById("tipAmmount");
let resultBill = document.getElementById("billAmmount");
let buttonReset = document.getElementById("buttonReset");
let error = document.querySelector(".errorMessage");

let bill;
let tip;
let people;

let totalTip;
let tipPerPerson;
let totalPerPerson;

if (
  billInput.value == "" ||
  !tipSelect.checked ||
  peopleInput.value == "" ||
  peopleInput.value == 0
) {
  buttonReset.disabled = true;
}

function getInput() {
  if (Number(peopleInput.value) == 0 || peopleInput.value == "") {
    error.classList.remove("hidden");
    peopleInput.classList.add("inputError");
  } else {
    error.classList.add("hidden");
    peopleInput.classList.remove("inputError");
    bill = Number(billInput.value);
    people = Number(peopleInput.value);
    getResult(tip, bill, people);
  }
}

function selectTipInput() {
  for (let i = 0; i < tipSelect.length; i++) {
    if (tipSelect[i].checked) {
      tip = Number(tipSelect[i].value) / 100;
      if (!customTip.value == "") {
        customTip.value = "";
      }
    }
  }
  getResult(tip, bill, people);
}

function customTipInput() {
  if (!customTip.value == "") {
    tip = Number(customTip.value) / 100;
    for (let i = 0; i < tipSelect.length; i++) {
      if (tipSelect[i].checked) {
        tipSelect[i].checked = false;
      }
    }
  }
  getResult(tip, bill, people);
}

function getResult(calcTip, calcBill, calcPeople) {
  totalTip = (calcBill * calcTip).toFixed(2);
  tipPerPerson = (totalTip / calcPeople).toFixed(2);
  totalPerPerson = (bill / calcPeople).toFixed(2);

  if (
    !billInput.value == "" &&
    !peopleInput.value == "" &&
    !peopleInput.value == 0
  ) {
    for (let i = 0; i < tipSelect.length; i++) {
      if (tipSelect[i].checked || !customTip.value == "") {
        resultTip.textContent = tipPerPerson;
        resultBill.textContent = totalPerPerson;
        buttonReset.disabled = false;
      }
    }
  } else {
    resultTip.textContent = "0.00";
    resultBill.textContent = "0.00";
    buttonReset.disabled = true;
  }
}

function resetCalculator() {
  error.classList.add("hidden");
  peopleInput.classList.remove("inputError");
  resultTip.textContent = "0.00";
  resultBill.textContent = "0.00";
  customTip.value = "";
  billInput.value = "";
  peopleInput.value = 1;
  for (let i = 0; i < tipSelect.length; i++) {
    tipSelect[i].checked = false;
  }
  buttonReset.disabled = true;
}
