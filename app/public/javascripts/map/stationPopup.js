
// Popup content
function addPopup(station, marker) {
    var popupContent = document.createElement("table-data");
    popupContent.innerHTML  = 
          '<table id = "marker-data" >' +
            '<tr> <td> Station </td><td>' + station.name +'</td></tr>' + 
            '<tr> <td> Län: </td><td>' + countyNames[station.county_number] + '</td></tr>' + 
            '<tr> <td>Lufttemperatur: </td><td></td></tr>' +
            '<tr> <td>Vägtemperatur: </td><td></td></tr>' +
            '<tr> <td>Luftfuktighet: </td><td></td></tr>' +
            '<tr> <td>Vindhastighet: </td><td></td></tr>' +
            '<tr> <td>Vindriktning: </td><td></td></tr>' +
    '</table>';

    // Leaflet require DOM therefor Jquery is not used
    var button = document.createElement("div");
    button.id = station.id;
    button.className = "add-button";
    button.innerText = "Lägg till";
    button.addEventListener("click" , function() {
         handleChosenStations(station, marker, this);
      
    });

    popupContent.appendChild(button);

    marker.bindPopup(popupContent).openPopup();
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
