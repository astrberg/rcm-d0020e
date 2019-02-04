

async function getWeatherData(station_id, start_time, stop_time) {

     //station_id = 'SE_STA_VVIS2240';
     //start_time = '2019-01-20 13:12:12';
     //stop_time = '2019-01-23 13:23:20';
		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {

	
	//console.log(weatherData);
	datamultieplegraf(weatherData);
	datamultieplegrafair(weatherData);
	datamultieplegrafhumidity(weatherData);
	datamultieplegrafwinspeed(weatherData);
    });	
}
	

async function getlatest(station_id) {

    //station_id = 'SE_STA_VVIS2240';
	
    await $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {
    	databarchartcurrent(weatherData);
    	databarchartroadcurrent(weatherData);
    	databarcharthumcurrent(weatherData);
    
    //console.log(weatherData);
	
    
    });	
}

