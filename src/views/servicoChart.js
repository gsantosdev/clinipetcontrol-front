import { Chart, Pie } from "react-chartjs-2";



export default gerarChart = () => {

  const DATA_COUNT = 3;
  const NUMBER_CFG = { count: DATA_COUNT };

  const dados = [
    {
      "label": "Banho",
      "value": 20
    },
    {
      "label": "Banho",
      "value": 1
    }
  ]



  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      hoverOffset: 4
    }]
  };

  dados.forEach(dado => {
    data.labels.push(dado.label)
    data.datasets[0].data.push(dado.value)
  })



  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };

}

