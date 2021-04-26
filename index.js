//Артем: При нажатии на кнопку 
//Рассчитать должен выводиться объект с ключами и значениями ввода

let form = document.querySelector('.userForm');
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let depositTerm = document.querySelector('.deposit-term');
let startingAmount = document.querySelector('.starting-amount');
class CalculateResultsObject {
  constructor (name, amount, deposit, startamount) {
    this.name = name
    this.amount = amount;
    this.deposit = deposit;
    this.startamount = startamount;
  }
}

calculateButton.addEventListener('click', (e) => {
  e.preventDefault();
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositTerm.value, startingAmount.value);
  console.log(objOfResult);
})