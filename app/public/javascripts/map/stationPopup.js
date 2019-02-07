
// Popup content
function addPopup(station, marker) {
    var div = document.createElement("table-data");
    div.id = "popupid:" + station.id;
    div.innerHTML = 
    '<table id = "marker-data" >' +
            '<tr> <td> Station </td><td>' + station.name +'</td></tr>' + 
            '<tr> <td> Län: </td><td>' + countyNames[station.county_number] + '</td></tr>' + 
            '<tr> <td>Lufttemperatur: </td><td></td></tr>' +
            '<tr> <td>Vägtemperatur: </td><td></td></tr>' +
            '<tr> <td>Luftfuktighet: </td><td></td></tr>' +
            '<tr> <td>Vindhastighet: </td><td></td></tr>' +
            '<tr> <td>Vindriktning: </td><td></td></tr>' +
    '</table>';

    // Button
    var button = document.createElement("button");
    button.id = "buttonid:" + station.id;
    button.className = "add-button";
    button.innerText = "Lägg till";
    button.addEventListener('click', function(){
        handleChosenStations(station, marker);

    });
    div.appendChild(button);
    marker.bindPopup(div);
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

function changeButtonState(station, newState){
    var button = document.getElementById("buttonid:" + station.id);
    
    if(button != null){
        if(newState == "remove"){
            changeButtonText(button, "remove-button", "Ta bort");
        
        }else if(newState == "add"){
            // changeButtonText(button, "add-button", "Lägg till");

        
        }else if(chosenStations.includes(station)){
            // changeButtonText(button, "remove-button", "Ta bort");

        
        }else{
            // changeButtonText(button, "add-button", "Lägg till");

        }
    }
}

function changeButtonText(button, classText, buttonText){
    button.className = classText;
    button.innerText = buttonText;
}