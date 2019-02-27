

async function getLatestWeatherData(station_id) {
   await $.getJSON("/api/getLatestWeatherData",  function(data) {
        latestWeatherData = data; 
    });
}

async function getAllLatestWeatherData() {

    await $.getJSON("/api/getAllLatestWeatherData", {length: stationsData.length},  function(data) {
         latestWeatherData = data; 
     });
 }

 async function getAvgCountyWeatherData(){
      await $.getJSON('/api/getAverageTempProvince', function(averageCountyWeather) {
          averageData = averageCountyWeather;

      });
}


async function getNewData(){
    await getAvgCountyWeatherData();
    await getAllLatestWeatherData();
}

var startTime = Date.now();
let interval_time = 1000*60*15;

//setInterval(getNewData, interval_time);
