//Артем: При нажатии на кнопку 
//Рассчитать должен выводиться объект с ключами и значениями ввода

let form = document.querySelector('.user-from');
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

function createNewSection() {
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value, dateRequire.value);
  let newButton = document.createElement('button');
  newButton.className = "delete-botton";
  newButton.type = "button";
  newButton.innerHTML = "Удалить";
  const newSection = document.createElement('ul');
  newSection.className = 'target-card';
  newSection.innerHTML = `<li class="item"><input value = "${objOfResult.name}" class="inp-target"></li>
                          <li class="item"><div><p class="treb-sum">Требуемая сумма</p><input value = "${objOfResult.amount}" class="inp-required-amount">руб.</div></li>
                          <li class="item"><div><p class="start-sum">Стартовая сумма</p><input value = "${objOfResult.startamount}" class="inp-starting-amount">руб.</div></li>
                          <li class="item"><div><p class="srok-vyplati">Срок выплаты</p><input value = "${objOfResult.date}" class="inp-term-of-deposit">мес.</div></li>
                          <li class="item item-end"><div><p class="precent-vklad">Процент по вкладу</p><input value = "${objOfResult.percents}" class="inp-percent">%</div></li>
                          <li class="item"><div><p class="interest-income">Доход от процента по вкладу</p><p class="income">${(objOfResult.amount - objOfResult.startamount)/100 * objOfResult.percents} руб.</p></div></li>
                          <li class="item-payment-amount"><div><p class="payment">Размер ежемесячного платежа</p><p class="inp-payment-amount">${((objOfResult.amount - objOfResult.startamount - ((objOfResult.amount - objOfResult.startamount)/100 * objOfResult.percents))/objOfResult.date).toFixed(4)} руб.</div></p></li>`;
  newSection.append(newButton);
  return newSection;
}

form.addEventListener('submit', (element) => {
  
  element.preventDefault();
  let newsection = createNewSection();
  let clone = newsection.cloneNode(true);
  document.querySelector('.newSection').append(clone);
  if (Number(requiredAmount.value) < Number(startingAmount.value) ) {
    alert('Внимание! Вы ввели неверные данные (требуемая сумма меньше первоначального взноса)!')
    clone.remove();
  }

  let newRequiredAmount = document.querySelector('.inp-required-amount');//Инпут с требуемой суммой
  let newTermOfDestroid = document.querySelector('.inp-term-of-deposit');//Инпут с сроком вклада
  let newStartingAmount = document.querySelector('.inp-starting-amount');//инпут с стартовой суммой
  let newPrecent = document.querySelector('.inp-percent');//Инпут с процентом 
  let newPayment = document.querySelector('.inp-payment-amount');//Размер ежемесячного
  let newIncome = document.querySelector('.income')//доход от процента

  newRequiredAmount.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value + "руб.";
  });
  newTermOfDestroid.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value + "руб.";
  });
  newStartingAmount.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4) + "руб."; 
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value + "руб.";
  });
  newPrecent.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value + "руб.";
  });

  clone.querySelector('.delete-botton').addEventListener('click', () => {
    clone.remove();
  })
  targetName.value = "";
  requiredAmount.value = "";
  dateRequire.value = "";
  depositPercentage.value = "";
  startingAmount.value = "";
  // console.log(objOfResult);
})

// 