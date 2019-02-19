
//Get weatherdata from the stations sent in
async function getWeatherData(station_id, start_time, stop_time,station_name) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
				datamultieplegraf(weatherData[i],station_name);
				datamultieplegrafair(weatherData[i],station_name);
				datamultieplegrafhumidity(weatherData[i],station_name);
				datamultieplegrafwinspeed(weatherData[i],station_name);
		}
		
    });	
}
	
//Get current latest weatherdata from the stations sent in
async function getlatest(station_id,station_name) {
    await $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
			databarchartcurrent(weatherData[i],station_name);
			databarchartroadcurrent(weatherData[i],station_name);
			databarcharthumcurrent(weatherData[i],station_name);
			databarchartwindcurrent(weatherData[i],station_name);
		}
    });	
}

