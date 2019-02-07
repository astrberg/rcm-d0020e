

async function getWeatherData(station_id, start_time, stop_time,station_name) {

     //station_id = 'SE_STA_VVIS2240';
     //start_time = '2019-01-20 13:12:12';
     //stop_time = '2019-01-23 13:23:20';
		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {

	
	//console.log(weatherData);
	datamultieplegraf(weatherData,station_name);
	datamultieplegrafair(weatherData,station_name);
	datamultieplegrafhumidity(weatherData,station_name);
	datamultieplegrafwinspeed(weatherData,station_name);
    });	
}
	

async function getlatest(station_id,station_name) {

    //station_id = 'SE_STA_VVIS2240';
	
    await $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {
    	databarchartcurrent(weatherData,station_name);
    	databarchartroadcurrent(weatherData,station_name);
    	databarcharthumcurrent(weatherData,station_name);
    	databarchartwindcurrent(weatherData,station_name);
    
    //console.log(weatherData);
	
    
    });	
}

