

function getLatestWeatherData(station_id) {
    var weatherData = null;
    $.getJSON("/api/getLatestWeatherData",{station_id}, function(latestWeatherData) {
        weatherData = latestWeatherData;
    }); 
    return weatherData;   
}

// function getAvgCountyWeatherData(county){
//     $.getJSON("/api/getLatestWeatherData",{station_id}, function(latestWeatherData) {
//         weatherData = latestWeatherData;
//     });
// }