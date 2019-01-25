

function getWeatherData(station_id, start_time, stop_time) {

    // station_id = 'SE_STA_VVIS2240';
    // start_time = '2019-01-20 13:12:12';
    // stop_time = '2019-01-23 13:23:20';

    $.getJSON("/api/getWeatherData", {station_id, start_time, stop_time}, function(weatherData) {

        console.log(weatherData);

    });

}