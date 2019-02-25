
// Popup content
function addPopup(station, marker) {
    var popupContent = document.createElement("table-data");

    let index = 0;
    for(let i = 0; i < stationsData.length; i++){
      if(station.id == latestWeatherData[i].station_id){
        index = i;
      }
    }
    
    popupContent.innerHTML  = 
          '<table id = "marker-data" >' +
            '<tr> <td> Station </td><td>' + station.name +'</td></tr>' + 
            '<tr> <td> Län: </td><td>' + countyNames[station.county_number] + '</td></tr>' + 
            '<tr> <td>Lufttemperatur: </td><td>' + latestWeatherData[index]['air_temperature']+ "\xB0C"+
            '<tr> <td>Vägtemperatur: </td><td>'+latestWeatherData[index]['road_temperature'] + "\xB0C" +
            '<tr> <td>Luftfuktighet: </td><td>'+latestWeatherData[index]['air_humidity'] + "%" +
            '<tr> <td>Vindhastighet: </td><td>'+latestWeatherData[index]['wind_speed'] + "m/s"
            '<tr> <td>Vindriktning: </td><td>' +windDirection(latestWeatherData[index]['wind_direction']) +
    '</table>';

    

    // Leaflet require DOM therefor Jquery is not used
    var button = document.createElement("button");
    button.id = station.id;
    button.className = "add-button";
    button.innerText = "Lägg till";
    button.addEventListener("click" , function() {
         handleChosenStations(station, marker, this);
      
    });
    popupContent.appendChild(button);

    // var popup = L.popup()
    // .setContent(button);

  marker.bindPopup(popupContent).openPopup();
}

function windDirection(data) {
    if(data == 'north') {
      return '&nbsp; <i class="fa fa-long-arrow-down"></i> <br>';
    }
    else if(data == 'south') {
      return '&nbsp; <i class="fa fa-long-arrow-up"></i> <br>';
    }
    else if(data == 'east') {
      return '&nbsp; <i class="fa fa-long-arrow-left"></i> <br>';
    }
    else if(data == 'west') {
      return '&nbsp; <i class="fa fa-long-arrow-right"></i> <br>';
    }
    else if(data == 'northEast') { //southWest
      return '&nbsp; <i class="fa fa-long-arrow-down" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'northWest') { //southEast
      return '&nbsp; <i class="fa fa-long-arrow-right" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southEast') { //northWest
      return '&nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southWest') { //northEast
      return '&nbsp; <i class="fa fa-long-arrow-left" style="transform: rotate(45deg)"></i> <br>';
    }
}
