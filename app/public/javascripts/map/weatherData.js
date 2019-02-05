

async function getLatestWeatherData(station_id) {
   await $.getJSON("/api/getLatestWeatherData",{station_id},  function(data) {
        latestWeatherData = data; 
    })
}

 async function getAvgCountyWeatherData(){
      await $.getJSON('/api/getAverageTempProvince', function(averageCountyWeather) {
          averageData = averageCountyWeather;

      });
  }

  function windDirection(data) {
      if(data[0].wind_direction == 'north') {
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-down"></i> <br>';
      }
      else if(data[0].wind_direction == 'south') {
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-up"></i> <br>';
      }
      else if(data[0].wind_direction == 'east') {
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-left"></i> <br>';
      }
      else if(data[0].wind_direction == 'west') {
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-right"></i> <br>';
      }
      else if(data[0].wind_direction == 'northEast') { //southWest
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-down" style="transform: rotate(45deg)"></i> <br>';
      }
      else if(data[0].wind_direction == 'northWest') { //southEast
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-right" style="transform: rotate(45deg)"></i> <br>';
      }
      else if(data[0].wind_direction == 'southEast') { //northWest
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate(45deg)"></i> <br>';
      }
      else if(data[0].wind_direction == 'southWest') { //northEast
        return 'Vindriktning: &nbsp; <i class="fa fa-long-arrow-left" style="transform: rotate(45deg)"></i> <br>';
      }
      

  }

 