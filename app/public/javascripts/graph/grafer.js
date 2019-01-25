	
	function graf(weatherdata){
	var newarray = [];
	var newarray2 = [];
	//console.log(weatherdata[0].road_temperature);
	for(var i = 0; i < weatherdata.length; i++){
		newarray.push(weatherdata[i].timestamp);
		newarray2.push(weatherdata[i].road_temperature);
	}

	var ctx = document.getElementById('myChart1').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'line',

	
	    data: {
		labels: newarray,
		datasets: [{
		    label: "Temperatur",
		    backgroundColor: 'rgb(255, 99, 132)',
		    borderColor: 'rgb(255, 99, 132)',
		    data: newarray2,
		}]
	    },

	
	    options: {
		
		}
	});
	}
	
	function graf1(stations,temparray){
	var ctx = document.getElementById('myChart2').getContext('2d');
	var chart = new Chart(ctx, {
	
	    type: 'bar',

	
	    data: {
		labels: stations,
		datasets: [{
		    label: "graf2",
		    backgroundColor: 'rgb(255, 99, 132)',
		    borderColor: 'rgb(255, 99, 132)',
		     data: temparray,
		}]
	    },

	
	    options: {}
	});
}

 function graf2(){
//different colors when data is below 0
	var pointBackgroundColors = [];
	var ctx = document.getElementById('myChart3').getContext('2d');
	var myChart = new Chart(ctx, {
	
	    type: 'line',

	
	    data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
		    label: "graf3",
		    pointBackgroundColor: pointBackgroundColors,
		    data: [-200, -50,0, 100, 200, 300,500,200],
		}]
	    },

	
	    options: {
		
		}
	});

	for (i = 0; i < myChart.data.datasets[0].data.length; i++) {
	    if (myChart.data.datasets[0].data[i] < 0) {
		pointBackgroundColors.push("#FF0000");

	    } else {
		pointBackgroundColors.push("#0000FF");

	    }
	}

	myChart.update();
}
	

function graf3(){
//car example multiple lines
var speedCanvas = document.getElementById("myChart4");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var dataFirst = {
    label: "Car A",
    data: [-30,0, 59, 75, 20, 20, 55, 40],
    lineTension: 0.3,
    fill: false,
    borderColor: 'red',
    backgroundColor: 'transparent',
    pointBorderColor: 'red',
    pointBackgroundColor: 'lightgreen',
    pointRadius: 5,
    pointHoverRadius: 15,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rect'
  };

var dataSecond = {
    label: "Car B",
    data: [-30,20, 15, 60, 60, 65, 30, 70],
    lineTension: 0.3,
    fill: false,
    borderColor: 'purple',
    backgroundColor: 'transparent',
    pointBorderColor: 'purple',
    pointBackgroundColor: 'lightgreen',
    pointRadius: 5,
    pointHoverRadius: 15,
    pointHitRadius: 30,
    pointBorderWidth: 2
  };

var speedData = {
  labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
  datasets: [dataFirst, dataSecond]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
}

