

async function getLatestWeatherData(station_id) {
   await $.getJSON("/api/getLatestWeatherData",  function(data) {
        latestWeatherData = data; 
    });
}

async function getAllLatestWeatherData() {

    await $.getJSON("/api/getAllLatestWeatherData",  function(data) {
         latestWeatherData = data; 
     });
 }

 async function getAvgCountyWeatherData(){
      await $.getJSON('/api/getAverageTempProvince', function(averageCountyWeather) {
          averageData = averageCountyWeather;

      });
}