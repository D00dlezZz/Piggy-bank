
let form = document.querySelector('.user-from');
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let dateRequire = document.querySelector('.deposit-term')
let depositPercentage = document.querySelector('.deposit-percentage');
let startingAmount = document.querySelector('.starting-amount');
let termOfDeposit = document.querySelector('.deposit-term');
let chartWrapper = document.querySelector('.chart-wrapper');
let myChart;


class CalculateResultsObject {
  constructor(name, amount, percents, startamount, date) {
    this.name = name,
    this.amount = amount,
    this.percents = percents,
    this.startamount = startamount,
    this.date = date
  }
}


let canvasId = 0;

function createNewSection() {
  let newWrapper = document.createElement('div');
  newWrapper.className = "new-wrapper";
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value, dateRequire.value);
  let newButton = document.createElement('button');
  newButton.className = "delete-botton";
  newButton.type = "button";
  newButton.innerHTML = "Удалить";
  let newChart = newGraff();
  const newSection = document.createElement('ul');
  newSection.className = 'target-card';
  newSection.innerHTML = `<li class="item"><p>Название цели<input value = "${objOfResult.name}" class="inp-target"></p></li>
                          <li class="item"><p>Требуемая сумма<input value = "${objOfResult.amount}" class="inp-required-amount"></p></li>
                          <li class="item"><p>Срок выплаты<input value = "${objOfResult.date}" class="inp-term-of-deposit"></p></li>
                          <li class="item"><p>Стартовая сумма<input value = "${objOfResult.startamount}" class="inp-starting-amount"></p></li>
                          <li class="item item-end"><p>Процент по вкладу<input value = "${objOfResult.percents}" class="inp-percent"></p></li>
                          <li class="item"><p class="interest-income">Доход от процента по вкладу</p><p class="income">${(objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents} руб.</p></li>
                          <li class="item-payment-amount"><p class="payment">Размер ежемесячного платежа</p><p class="inp-payment-amount">${(objOfResult.amount - objOfResult.startamount - ((objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents)) / objOfResult.date} руб.</p></li>`;
  newSection.append(newButton);
  newWrapper.append(newChart);
  const createdCanvasId = canvasId++;
  newWrapper.prepend(newSection)
  setTimeout(() => {
    let canvas = document.getElementById(`createdChart-${createdCanvasId}`)  
    let ctx = canvas.getContext('2d');
    console.log(ctx);
    myChart = new Chart(ctx, {
      type: 'pie',
      data: data
    });
    console.log(data, myChart);
    myChart.update();
  }, 10)
  return newWrapper;
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
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4);
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value;
  });
  newTermOfDestroid.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4);
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value;
  });
  newStartingAmount.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4);
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value;
  });
  newPrecent.addEventListener('input', () => {
    newPayment.innerHTML = (((newRequiredAmount.value - newStartingAmount.value - ((newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value)))/newTermOfDestroid.value).toFixed(4);
    newIncome.innerHTML = (newRequiredAmount.value - newStartingAmount.value)/100 * newPrecent.value;
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





function newGraff() {
  let graff = document.createElement("div");
  graff.className = "chart-wrapper";
  graff.innerHTML = `<canvas id="createdChart-${canvasId}"></canvas>`;

  return graff;
}


let data = {
  labels: [
    'January',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'Jule',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [{
    label: 'My Dataset',
    data: [10, 20, 30, 40],
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
    hoverOffset: 10,
    borderWidth: 2,
    borderColor: '#f11f23f3',
    borderRadius: 25
  }],

};


let updateChartValue = (input, dataOrder) => {
  input.addEventListener('input', event => {

    myChart.data.datasets[0].data[dataOrder] = Number(event.target.value);
    myChart.update();
 
  })
};


updateChartValue(termOfDeposit, 0);
updateChartValue(requiredAmount, 1);
updateChartValue(depositPercentage, 2);
updateChartValue(startingAmount, 3);












