let form = document.querySelector('.user-from');
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let dateRequire = document.querySelector('.deposit-term')
let depositPercentage = document.querySelector('.deposit-percentage');
let startingAmount = document.querySelector('.starting-amount');
let termOfDeposit = document.querySelector('.deposit-term');
let chartWrapper = document.querySelector('.chart-wrapper');
let payFirstMonth = 0;
let paymentEveryMonth = 0;
let canvasId = 0;
const createdCanvasId = canvasId++;
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
  let newWrapper = document.createElement('div');
  newWrapper.className = "new-wrapper";
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value, dateRequire.value);
  let newButton = document.createElement('button');
  newButton.className = "delete-botton";
  newButton.type = "button";
  newButton.innerHTML = "УДАЛИТЬ";
  let newChart = newGraff();
  const newSection = document.createElement('ul');
  newSection.className = 'target-card';
  newSection.innerHTML = `<li class="item"><input value = "${objOfResult.name}" class="inp-target"></li>
                          <li class="item"><div class="block-item"><p class="treb-sum">Требуемая сумма</p><input value = "${objOfResult.amount}" class="inp-required-amount"><p class="segment">руб.</p></div></li>
                          <li class="item"><div class="block-item"><p class="start-sum">Стартовая сумма</p><input value = "${objOfResult.startamount} " class="inp-starting-amount"><p class="segment">руб.</p></div></li>
                          <li class="item"><div class="block-item"><p class="srok-vyplati">Срок выплаты</p><input value = "${objOfResult.date}" class="inp-term-of-deposit"><p class="segment">мес.</p></div></li>
                          <li class="item item-end"><div class="block-item"><p class="precent-vklad">Процент по вкладу</p><input value = "${objOfResult.percents}" class="inp-percent"><p class="segment">%</p></div></li>
                          <li class="item"><div class="block-item"><p class="interest-income">Доход от процента по вкладу</p><p class="income">${((objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents).toFixed(4)} руб.</p></div></li>
                          <li class="item-payment-amount"><div class="block-item"><p class="payment">Размер ежемесячного платежа</p><p class="inp-payment-amount">${((objOfResult.amount - objOfResult.startamount - ((objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents)) / objOfResult.date).toFixed(4)} руб.</div></p></li>`;
  newSection.prepend(newButton);
  newWrapper.append(newChart);
  const createdCanvasId = canvasId++;
  newWrapper.prepend(newSection)
  return newWrapper;
}
form.addEventListener('submit', (element) => {
  element.preventDefault();
  if (Number(requiredAmount.value) < Number(startingAmount.value)) {
    alert('Внимание! Вы ввели неверные данные (требуемая сумма меньше первоначального взноса)!')
    return;
  }
  let newsection = createNewSection();
  document.querySelector('.newSectionContainer').append(newsection);
  let canvas = newsection.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'pie',
    data: data
  });
  updateChartValue(requiredAmount, 0, myChart);
  myChart.update();
  updateChartValue(startingAmount, 1, myChart);
  myChart.update();
  let newRequiredAmount = newsection.querySelector('.inp-required-amount');//Инпут с требуемой суммой
  let newTermOfDestroid = newsection.querySelector('.inp-term-of-deposit');//Инпут с сроком вклада
  let newStartingAmount = newsection.querySelector('.inp-starting-amount');//инпут с стартовой суммой
  let newPrecent = newsection.querySelector('.inp-percent');//Инпут с процентом 
  let newPayment = newsection.querySelector('.inp-payment-amount');//Размер ежемесячного
  let newIncome = newsection.querySelector('.income')//доход от процента
  newRequiredAmount.addEventListener('input', (el) => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value))) / newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value + "руб.";
    updateChartValue(el.target, 0, myChart);
    myChart.update();
  });
  newTermOfDestroid.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value))) / newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value + "руб.";
  });
  newStartingAmount.addEventListener('input', (el) => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value))) / newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value + "руб.";
    updateChartValue(el.target, 1, myChart);
    myChart.update();
  });
  newPrecent.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value))) / newTermOfDestroid.value).toFixed(4) + "руб.";
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value) / 100 * newPrecent.value + "руб.";
  });
  newsection.querySelector('.delete-botton').addEventListener('click', () => {
    newsection.remove();
  })
  targetName.value = "";
  requiredAmount.value = "";
  dateRequire.value = "";
  depositPercentage.value = "";
  startingAmount.value = "";
})
function newGraff() {
  let graff = document.createElement("div");
  graff.className = "chart-wrapper";
  graff.innerHTML = `<canvas id="createdChart-${canvasId}"></canvas>`;
  return graff;
}
let data = {
  labels: [
    'Требуемая сумма',
    'Стартовая сумма'
  ],
  datasets: [{
    label: 'My Dataset',
    data: [],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(0, 128, 0)',
      'rgb(128, 0, 128)',
      'rgb(128, 128, 128)',
      'rgb(0, 255, 255)',
      'rgb(0, 100, 0)',
      'rgb(0, 255, 0)',
      'rgb(255, 215, 0)',
      'rgb(238, 130, 238)',
      'rgb(138 43 226)'
    ],
    hoverOffset: 34,
    borderWidth: 8,
    borderColor: '#fff3',
    borderRadius: 1
  }],
};
function updateChartValue(input, dataOrder, myChart) {
  myChart.data.datasets[0].data[dataOrder] = Number(input.value);
}
