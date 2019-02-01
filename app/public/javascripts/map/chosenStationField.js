

function displayStationField(){
    var div = $("#stationList-container")

    if (div.is(":hidden")) {
        div.show();
        addStationsToField();
    } else {
        
        div.hide();
    }
}


// index is the stations index in the list of chosen stations
function getStationBox(index, name){
    var stationDiv = `<div class="stationBox stationBox${index}"> 
                        <div class="stationBox-container">
                            <h3> Station name: '${name}'</h3> 
                            <button class="removeStation" onclick="removeStationViaList('${chosenStations[index]}',${index})" >Remove</button>
                        </div>
                      </div>`;

    return stationDiv;
}



function addStationsToField(){
    $("#stationList-container").empty();
    
    for(var i = 0; i < chosenStations.length; i++){
        $("#stationList-container").append(getStationBox(i, chosenStations[i].name));
    }
   
}

function showStationButton(){
    $("#stationList-button").show();
    
}

function hideStationButton(){
    $("#stationList-button").hide();
    $("#stationList-container:visible").hide()
}