//Артем: При нажатии на кнопку 
//Рассчитать должен выводиться объект с ключами и значениями ввода

let form = document.querySelector('.userForm');
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let depositPercentage = document.querySelector('.deposit-percentage');
let startingAmount = document.querySelector('.starting-amount');
class CalculateResultsObject {
  constructor(name, amount, persents, startamount) {
    this.name = name
    this.amount = amount;
    this.persents = persents;
    this.startamount = startamount;
  }
}

calculateButton.addEventListener('click', (e) => {
  e.preventDefault();
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value);
  console.log(objOfResult);
})