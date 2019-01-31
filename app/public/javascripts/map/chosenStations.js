

function displayStationField(){

    var div = document.getElementById("stationList-container");

    if (div.style.display === "none") {
        div.style.display = "block";
        addStationsToField();
    
      } else {
        div.style.display = "none";
      }
}


// index is the stations index in the list of chosen stations
function getStationBox(index, name){
    var stationDiv = `<div class="stationBox"> 
                        <div class="stationBox-container">
                            <h3> Station name: '${name}'</h3> 
                            <button class="removeStation" onclick="removeStation('${index}')" >Remove</button>
                        </div>
                      </div>`;

    return stationDiv;
}



function addStationsToField(){
    $("#stationList-container").empty();
    
    // for(var i = 0; i < chosenStations.length(); i++){
    //     $("#stationList-container").append(getStationBox(chosenStations[i].id, chosenStations[i].name));
    // }

    for(var i = 0; i < 15; i++){
        $("#stationList-container").append(getStationBox(i, "WASD"));
    }
   
}