
async function getLatestWeatherData(station, marker) {
    station_id = station.id;
   await $.getJSON("/api/getLatestWeatherData",{station_id}, function(latestWeatherData) {
          getLatestWeatherDataCallback(station,marker,latestWeatherData);
    }); 
}

 function getLatestWeatherDataCallback(station,marker,data){
    var station_id = station.id;
    var div = document.createElement("div");
    div.id = "popupid:" + station.id;
    var center = document.createElement("div");
    center.className = "center";
    var button = document.createElement("button");
    button.id = "buttonid:" + station.id;
    if(!chosenStations.includes(station)){
        button.className = "add-button";
        button.innerText = "Lägg till";
    }else{
        button.className = "remove-button";
        button.innerText = "Ta bort";
    }
    button.addEventListener('click', function(){
        handleChosenStations(station, marker);
    });
    center.appendChild(button);
    var content = document.createElement("P");
    content.className = "popup-content";
    content.innerHTML = 
        'Station: ' + station.name + '<br>' +
        'Län: ' + countyNames[station.county_number] + '<br>' + 
        'Lufttemperatur: ' + data[0].air_temperature + '\xB0C<br>' +
        'Vägtemperatur: ' + data[0].road_temperature + '\xB0C<br>' +
        'Luftfuktighet: ' + data[0].air_humidity + '% <br>' +
        'Vindhastighet: ' + data[0].wind_speed + ' m/s <br>';
    var wind_direction = windDirection(data);
    content.innerHTML += wind_direction;
        
    div.appendChild(content);
    div.appendChild(center);
    marker._popup.setContent(div);
    
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

 