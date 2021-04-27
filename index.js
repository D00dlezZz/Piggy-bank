//Артем: При нажатии на кнопку 
//Рассчитать должен выводиться объект с ключами и значениями ввода

let form = document.querySelector('.user-form');
let calculateButton = document.querySelector('.calculate-button');
let targetName = document.querySelector('.target-name');
let requiredAmount = document.querySelector('.required-amount');
let dateRequire = document.querySelector('.deposit-term')
let depositPercentage = document.querySelector('.deposit-percentage');
let startingAmount = document.querySelector('.starting-amount');
let targetCard = document.querySelector('.target-card');
let chartWrapperContainer = document.querySelector('chart-wrapper-container');
let termOfDeposit = document.querySelector('.deposit-term');
let myGraff = document.getElementById('myChart');
let chartWrapper = document.querySelector('chart-wrapper')



class CalculateResultsObject {
  constructor(name, amount, percents, startamount, date) {
    this.name = name,
      this.amount = amount,
      this.percents = percents,
      this.startamount = startamount,
      this.date = date
  }
}

let ctx;

function createNewSection() {
  let objOfResult = new CalculateResultsObject(targetName.value, requiredAmount.value, depositPercentage.value, startingAmount.value, dateRequire.value);
  let newButton = document.createElement('button');
  newButton.className = "delete-botton";
  newButton.type = "button";
  newButton.innerHTML = "Удалить";
  const newSection = document.createElement('ul');
  newSection.className = 'target-card';
  newSection.innerHTML = `<li class="item"><p>Название цели<input value = "${objOfResult.name}" class="inp-target"></p></li>
                          <li class="item"><p>Требуемая сумма<input value = "${objOfResult.amount}" class="inp-required-amount"></p></li>
                          <li class="item"><p>Срок выплаты<input value = "${objOfResult.date}" class="inp-term-of-deposit"></p></li>
                          <li class="item"><p>Стартовая сумма<input value = "${objOfResult.startamount}" class="inp-starting-amount"></p></li>
                          <li class="item item-end"><p>Процент по вкладу<input value = "${objOfResult.percents}" class="inp-percent"></p></li>
                          <li class="item"><p class="interest-income">Доход от процента по вкладу</p><p class="income">${(objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents} руб.</p></li>
                          <li class="item-payment-amount"><p class="payment">Размер ежемесячного платежа</p><p class="inp-payment-amount">${(objOfResult.amount - objOfResult.startamount - ((objOfResult.amount - objOfResult.startamount) / 100 * objOfResult.percents)) / objOfResult.date} руб.</p></li>`;
  // let graff = document.createElement("div");
  // graff.className = "chart-wrapper";
  
  // graff.innerHTML = `<canvas id="myChart"></canvas>`;
  // // newSection.prepend(graff);
  // // chartWrapperContainer.insertBefore(graff,newSection);
  // // chartWrapperContainer.insertBefore(graff,newSection);
  // chartWrapper.classList.add('.showContent');
  // ctx = document.getElementById('myChart').getContext('2d');
  newSection.append(newButton);
  return newSection;
}

calculateButton.addEventListener('click', (element) => {
  element.preventDefault();
  let newsection = createNewSection();
  let clone = newsection.cloneNode(true);
  document.querySelector('.newSection').append(clone);
  console.log(clone);
  document.querySelector('.inp-required-amount').addEventListener('input', () => {
    document.querySelector('.income').innerHTML = (document.querySelector('.inp-required-amount').value - document.querySelector('.inp-starting-amount').value) / 100 * document.querySelector('.inp-percent').value;
  })
  clone.querySelector('.delete-botton').addEventListener('click', () => {
    clone.remove();
  })
  // chartWrapper.classList.add('showContent');
  chartWrapper.style.display = 'flex';
  targetName.value = "";
  requiredAmount.value = "";
  dateRequire.value = "";
  depositPercentage.value = "";
  startingAmount.value = "";
  // console.log(objOfResult);
})

function createGraff() {
let graff = document.createElement("div");
graff.className = "chart-wrapper";

graff.innerHTML = `<canvas id="myChart"></canvas>`;
// chartWrapper.classList.add('.showContent');
ctx = document.getElementById('myChart').getContext('2d');
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
    // hoverOffset: 13,
    borderWidth: 2,
    borderColor: '#f11f23f3',
    borderRadius: 25
  }],

};


ctx = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctx, {
  type: 'pie',
  data: data
})


let updateChartValue = (input, dataOrder) => {
  input.addEventListener('input', event => {
    // console.log(event.target.value);
    // console.log(myChart[0].data.datasets.data[0]);
    console.log(data.datasets[0].data[0]);
    myChart.data.datasets[0].data[dataOrder] = Number(event.target.value);
    myChart.update();
    // console.log(data.datasets[0].data[0]);
  })
};

// termOfDeposit.oninput(() => {
//     myChart.data.dataset[0].data[dataOrder] = event.target.value;
//     myChart.update();
// })

updateChartValue(termOfDeposit, 0);
updateChartValue(requiredAmount, 1);
updateChartValue(depositPercentage, 2);
updateChartValue(startingAmount, 3);








