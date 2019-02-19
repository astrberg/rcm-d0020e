

async function getLatestWeatherData(station_id) {
   await $.getJSON("/api/getLatestWeatherData",{station_id},  function(data) {
        latestWeatherData = data[0]; 
    });
}

 async function getAvgCountyWeatherData(){
      await $.getJSON('/api/getAverageTempProvince', function(averageCountyWeather) {
          averageData = averageCountyWeather;

      });
}