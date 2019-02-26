
//Get weatherdata from the stations sent in
async function getWeatherData(station_id, start_time, stop_time,station_name) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
		console.log(weatherData[i])
				datamultieplegraf(weatherData[i],station_name[i]);
				datamultieplegrafair(weatherData[i],station_name[i]);
				datamultieplegrafhumidity(weatherData[i],station_name[i]);
				datamultieplegrafwinspeed(weatherData[i],station_name[i]);
		}
		
    });	
}
	
//Get current latest weatherdata from the stations sent in
async function getlatest(station_id,station_name) {
    await $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
			databarchartcurrent(weatherData[i],station_name[i]);
			databarchartroadcurrent(weatherData[i],station_name[i]);
			databarcharthumcurrent(weatherData[i],station_name[i]);
			databarchartwindcurrent(weatherData[i],station_name[i]);
		}
    });	
}

