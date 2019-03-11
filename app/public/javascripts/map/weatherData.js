/**
 * Updates the latest weather data for a specific station.
 * @param {*} station_id the station id of a specific station.
 */
async function getLatestWeatherData(station_id) {
   await $.getJSON("/api/getLatestWeatherData",  function(data) {
        latestWeatherData = data; 
    });
}

/**
 * Updates the latest weather data for all stations
 */
async function getAllLatestWeatherData() {

    await $.getJSON("/api/getAllLatestWeatherData", {length: stationsData.length},  function(data) {
         latestWeatherData = data; 
     });
 }

 /**
  * Updates the latest average county weather data
  */
 async function getLatestAvgCountyWeatherData(){
      await $.getJSON('/api/getLatestAverageTempProvince', function(averageCountyWeather) {
          averageData = averageCountyWeather;

      });
}

/**
 * Get new weather data for stations and counties.
 */
async function getNewData(){
    await getLatestAvgCountyWeatherData();
    await getAllLatestWeatherData();
}

var startTime = Date.now();
let interval_time = 1000*60*15;

//setInterval(getNewData, interval_time);
