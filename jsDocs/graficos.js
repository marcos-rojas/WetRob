var list = [
    { name: 'myChart1',title: 'Temperatura', reading: 1, symbol: ' °C',color: 'rgba(247, 135, 30,1)'},
    { name: 'myChart2', title:'Presión',reading: 2, symbol: ' Pa',color: 'rgba(0, 0, 0,1)' },
    { name: 'myChart3', title:'Temperatura Agua',reading: 3, symbol: ' °C',color: 'rgba(247, 178, 30,1)' },
    { name: 'myChart4', title:'Calidad aire',reading: 4, symbol: '',color: 'rgba(46, 206, 25,1)' },
    { name: 'myChart5', title:'pH',reading: 5, symbol: '',color: 'rgba(94, 25, 206,1)' },
    { name: 'myChart6', title:'Fósforo',reading: 6, symbol: '',color: 'rgba(192, 160, 199,1)' },
  ];
  

  
  
  list.forEach(chart => {
     chartIt(chart);  
  });
    
  async function chartIt(chart) {
    const data = await getData(chart);
    const ctx = document.getElementById(chart.name).getContext('2d');  
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.xs,
        datasets: [{
          label: chart.title,
          data: data.ys,
          fill: false,
          backgroundColor:chart.color,
          borderColor: chart.color,
          borderWidth: 1
        }]
      },
      options: {
      scales: {
          y: {
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return value.toFixed(3)+chart.symbol;
                  }
              }
          }
      }
  }
  
  
    });
  }
  
  //Gtting data
  
  async function getData(chart) {
    const xs = [];
    const ys=[];
  
    const response = await fetch('prueba.csv');//There are parse object in other environment
    const data = await response.text();
    const table = data.split('\n').slice(1);//split with a break line
    table.forEach(row => {
      const column = row.split(',');
      const year = column[0];
      xs.push(year);
      const temp = column[chart.reading];
      var valorSinEditar = parseFloat(temp);
      ys.push(valorSinEditar+14);
      
    });
    return{xs,ys};
  }
  