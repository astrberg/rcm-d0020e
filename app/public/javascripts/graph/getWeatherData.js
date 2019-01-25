

function getWeatherData(station_id, start_time, stop_time) {

     //station_id = 'SE_STA_VVIS2240';
     //start_time = '2019-01-20 13:12:12';
     //stop_time = '2019-01-23 13:23:20';
		
    $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {

	
        //console.log(weatherData);
	graf(weatherData);
	graf1();
	graf2();
	graf3();
    });
	
}

var stations = ['SE_STA_VVIS1524','SE_STA_VVIS1525','SE_STA_VVIS1536','SE_STA_VVIS1544','SE_STA_VVIS1557','SE_STA_VVIS2240'];

var temparray = [];
function initlatestgraf(){
	for(var i = 0; i < stations.length; i++){
		//
	}

	graf1(stations,temparray);
}

function getlatest(station_id) {

     //station_id = 'SE_STA_VVIS2240';
     //start_time = '2019-01-20 13:12:12';
     //stop_time = '2019-01-23 13:23:20';
		
    $.getJSON("/api/getLatestWeatherData", {station_id}, function(weatherData) {

    return weatherData;
    
    //console.log(weatherData[0].road_temperature);
    
    });	
}

//SE_STA_VVIS1524
//SE_STA_VVIS1525
//SE_STA_VVIS1536
//SE_STA_VVIS1544
//SE_STA_VVIS1557
