
//Get weatherdata from the stations sent in
async function getWeatherData(station_id, start_time, stop_time,station_name) {		
	await $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {
		for(let i = 0; i < weatherData.length; i++){
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
/*
//Get current latest weatherdata from the stations sent in
async function getlatest(station_id,station_name) {


// loop through every given station id and get the find the 
	// weatherdata of that station in the latestWeather list
	for(let j = 0; j < station_id.length; j++){

		for(let i = 0; i < latestWeatherData.length; i++){
			// when found, draw the graphs
			if(station_id[j] == latestWeatherData[i].station_id){
				databarchartcurrent(latestWeatherData[i],station_name[j]);
				databarchartroadcurrent(latestWeatherData[i],station_name[j]);
				databarcharthumcurrent(latestWeatherData[i],station_name[j]);
				databarchartwindcurrent(latestWeatherData[i],station_name[j]);
				break;
			}
		}
		
	}
   
}
*/

