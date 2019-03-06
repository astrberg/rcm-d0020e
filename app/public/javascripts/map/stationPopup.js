/**
 * Creates and returns the popup content for a station marker.
 * @param {*} station a station data JSON object.
 * @param {*} marker a Leaflet marker representing a specific station.
 */
function addPopup(station, marker) {
  let popupContent = document.createElement("table-data");

  let index = getLatestWeatherIndex(station);
  
  if(index == -1){
    console.log("ERROR");
  }else{
    
    popupContent.innerHTML  = 
    '<table id = "marker-data" >' +
    '<tr> <td> Station </td><td>' + station.name +'</td></tr>' + 
    '<tr> <td> Län: </td><td>' + countyNames[station.county_number] + '</td></tr>' + 
    '<tr> <td>Lufttemperatur: </td><td>' + latestWeatherData[index]['air_temperature']+ "\xB0C"+
    '<tr> <td>Vägtemperatur: </td><td>'+latestWeatherData[index]['road_temperature'] + "\xB0C" +
    '<tr> <td>Luftfuktighet: </td><td>'+latestWeatherData[index]['air_humidity'] + "%" +
    '<tr> <td>Vindhastighet: </td><td>'+latestWeatherData[index]['wind_speed'] + "m/s" +
    '<tr> <td>Vindriktning: </td><td>' + windDirection(latestWeatherData[index]['wind_direction']) + 
    '</table>';
  }
    //console.log(windDirection(latestWeatherData[index]['wind_direction']));


  

  // Leaflet require DOM therefor Jquery is not used
  let button = document.createElement("button");
  button.id = station.id;
  if(chosenStations.includes(station)){
    button.className = "remove-button";
    button.innerText = "Ta bort";
  }else{
    button.className = "add-button";
    button.innerText = "Lägg till";
  }
  
  button.addEventListener("click" , function() {
        handleChosenStations(station, marker, this);
    
  });
  popupContent.appendChild(button);

  return popupContent;
}

function windDirection(data) {
    if(data == 'north') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-down fa-2x"></i> <br>';
    }
    else if(data == 'south') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-up fa-2x"></i> <br>';
    }
    else if(data == 'east') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-left fa-2x"></i> <br>';
    }
    else if(data == 'west') {
      return '&nbsp; <i class="fas fa-long-arrow-alt-right fa-2x"></i> <br>';
    }
    else if(data == 'northEast') { //southWest
      return '&nbsp; <i class="fas fa-long-arrow-alt-down fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'northWest') { //southEast
      return '&nbsp; <i class="fas fa-long-arrow-alt-right fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southEast') { //northWest
      return '&nbsp; <i class="fas fa-long-arrow-alt-up fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southWest') { //northEast
      return '&nbsp; <i class="fas fa-long-arrow-alt-left fa-2x" style="transform: rotate(45deg)"></i> <br>';
    }
}

/**
 * Use this method to get a specific index from the latestWeatherdata array based on a specific station.
 * @param {*} station a station data JSON object.
 */
function getLatestWeatherIndex(station){
  for(let j = 0; j < latestWeatherData.length; j++){
      if(station.id === latestWeatherData[j].station_id){
          return j;
      }
  } 
  return -1;
}