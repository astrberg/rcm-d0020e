
//Get weatherdata from the stations sent in
async function getWeatherData(station_id, start_time, stop_time,station_name) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {
	datamultieplegraf(weatherData,station_name);
	datamultieplegrafair(weatherData,station_name);
	datamultieplegrafhumidity(weatherData,station_name);
	datamultieplegrafwinspeed(weatherData,station_name);
    });	
}
	
//Get current latest weatherdata from the stations sent in
async function getlatest(station_id,station_name) {
    await $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {
    	databarchartcurrent(weatherData,station_name);
    	databarchartroadcurrent(weatherData,station_name);
    	databarcharthumcurrent(weatherData,station_name);
    	databarchartwindcurrent(weatherData,station_name);
    });	
}

