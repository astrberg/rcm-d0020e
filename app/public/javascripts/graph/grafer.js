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
	
//current data air temp
function databarchartcurrent(weatherdata){
	var stationame = weatherdata[0].station_id;
	var datatempvar= weatherdata[0].air_temperature;
	generatedataforbar(datatempvar,stationame)
}


var currentdatatemp = [];
function generatedataforbar(datatempvar,stationame){
    var dataFirst = {
    label: stationame,
    backgroundColor: colornamelist[stationnamelist.indexOf(stationame)],
    borderColor: colornamelist[stationnamelist.indexOf(stationame)],
    data: [datatempvar]
  };
  currentdatatemp.push(dataFirst);
}

function currenttempgraph(weatherdata){
	var ctx = document.getElementById('myChart5').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentdatatemp
	    },

	
	    options: {}
	});
}


//wind_speed
//multiple lines in the graph
var datagrafwindspeed = [];
var datagraftimestampwindspeed = [];	
function datamultieplegrafwinspeed(weatherdata){
	var datagrafwindspeed = [];
	var valuegraph = "windspeed"
	var stationame = weatherdata[0].station_id;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafwindspeed.push(weatherdata[i].wind_speed);
	if(datagraftimestampwindspeed.length < weatherdata.length){
		datagraftimestampwindspeed.push(weatherdata[i].timestamp.slice(2,10));
	}
	}
	generatedata(valuegraph,datagrafwindspeed,stationame)
}

//humidity
//multiple lines in the graph
var datagrafhum = [];
var datagraftimestamphum = [];	
function datamultieplegrafhumidity(weatherdata){
	var datagrafhum = [];
	var valuegraph = "humidity"
	var stationame = weatherdata[0].station_id;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafhum.push(weatherdata[i].air_humidity);
		if(datagraftimestamphum.length < weatherdata.length){
		datagraftimestamphum.push(weatherdata[i].timestamp.slice(2,10));
	}
	}
	generatedata(valuegraph,datagrafhum,stationame)
}


//air_temp
//multiple lines in the graph
var datagrafair = [];
var datagraftimestampair = [];	
function datamultieplegrafair(weatherdata){
	var datagrafairtemp = [];
	var valuegraph = "airtemp"
	var stationame = weatherdata[0].station_id;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafairtemp.push(weatherdata[i].air_temperature);
		if(datagraftimestampair.length < weatherdata.length){
		datagraftimestampair.push(weatherdata[i].timestamp.slice(2,10));
	}
	}
	generatedata(valuegraph,datagrafairtemp,stationame)
}


//road_temp
//multiple lines in the graph
var data3graf3 = [];
var datagraftimestamp = [];	
function datamultieplegraf(weatherdata){
	var datagrafroadtemp = [];
	var valuegraph = "roadtemp"
	var stationame = weatherdata[0].station_id;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafroadtemp.push(weatherdata[i].road_temperature);
		if(datagraftimestamp.length < weatherdata.length){
			datagraftimestamp.push(weatherdata[i].timestamp.slice(2,10));
		}
	}
	generatedata(valuegraph, datagrafroadtemp,stationame)
}

var stationnamelist = [];
var colornamelist = [];
function generatedata(value, datagraf, stationame){
    if(stationnamelist.includes(stationame)){
	    var dataFirst = {
	    label: stationame,
	    data: datagraf,
	    lineTension: 0.3,
	    fill: false,
	    borderColor: colornamelist[stationnamelist.indexOf(stationame)],
	    backgroundColor: 'transparent',
	    pointBorderColor: colorforline,
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 1,
	    pointHoverRadius: 5,
	    pointHitRadius: 2,
	    pointBorderWidth: 1,
	    pointStyle: 'rect'
  };
}
else{
    var colorforline = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    stationnamelist.push(stationame);
    colornamelist.push(colorforline);
	    var dataFirst = {
	    label: stationame,
	    data: datagraf,
	    lineTension: 0.3,
	    fill: false,
	    borderColor: colorforline,
	    backgroundColor: 'transparent',
	    pointBorderColor: colorforline,
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 1,
	    pointHoverRadius: 5,
	    pointHitRadius: 2,
	    pointBorderWidth: 1,
	    pointStyle: 'rect'

};
}

	if(value=="roadtemp"){
		data3graf3.push(dataFirst);
	}
	if(value=="airtemp"){
		datagrafair.push(dataFirst);
	}
	if(value=="humidity"){
		datagrafhum.push(dataFirst);
	}
	if(value=="windspeed"){
		datagrafwindspeed.push(dataFirst);
	}
}


//function to create road_temp graph
function roadtemp(){
var speedCanvas = document.getElementById("myChart2");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestamp,
  datasets: data3graf3
};

var chartOptions = {
    title:{
	display:true,
	text: "Road_temp",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}



//function to create air_temp graph
function airtemp(){
var speedCanvas = document.getElementById("myChart1");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestampair,
  datasets: datagrafair
};

var chartOptions = {
    title:{
	display:true,
	text: "Air_temp",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}


//function to create humidity graph
function humiditygraph(){
var speedCanvas = document.getElementById("myChart3");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestamphum,
  datasets: datagrafhum
};

var chartOptions = {
    title:{
	display:true,
	text: "Air_humidity",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}


//function to create windspeed graph
function windspeed(){
var speedCanvas = document.getElementById("myChart4");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestampwindspeed,
  datasets: datagrafwindspeed
};

var chartOptions = {
    title:{
	display:true,
	text: "Wind_speed",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}

//wind_direction

