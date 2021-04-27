//Артем: При нажатии на кнопку 
//Рассчитать должен выводиться объект с ключами и значениями ввода

let form = document.querySelector('.userForm');
let input = document.querySelectorAll('input')
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let dateRequire = document.querySelector('.deposit-term')
let depositPercentage = document.querySelector('.deposit-percentage');
let startingAmount = document.querySelector('.starting-amount');

class CalculateResultsObject {
  constructor(name, amount, percents, startamount, date) {
    this.name = name,
    this.amount = amount,
    this.percents = percents,
    this.startamount = startamount,
    this.date = date
  }
}



calculateButton.addEventListener('click', (element) => {
  element.preventDefault();
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value, dateRequire.value);
  const newSection = document.createElement('ul');
  newSection.className = 'target-card';
  newSection.innerHTML = `<button class="delete"></button>
                          <li class="item"><p>Размер платежа</p><input value ="${((objOfResult.amount - objOfResult.startamount) / objOfResult.date).toFixed(4)}"></li>
                          <li class="item"><p>Название цели</p><input value = "${objOfResult.name}"></li>
                          <li class="item"><p>Требуемая сумма</p><input value = "${objOfResult.amount}"></li>
                          <li class="item"><p>Срок выплаты</p><input value = "${objOfResult.date}"></li>
                          <li class="item"><p>Стартовая сумма</p><input value = "${objOfResult.startamount}"></li>
                          <li class="item"><p>Процент по вкладу</p><input value = "${objOfResult.percents}"></li>`;
  document.querySelector('.newSection').append(newSection);
})


