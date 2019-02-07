// lock and unlock map dragging when hovering over suggestion-field
$("#stationList-container").mouseenter( function(){
    map.dragging.disable();
}).mouseleave(function(){
    map.dragging.enable();
});

function displayStationField(){
    var div = $("#stationList-container")

    if (div.is(":hidden")) {
        div.show();
    } else {
        
        div.hide();
    }
}


// index is the stations index in the list of chosen stations
function getStationBox(index, name){
    var stationDiv = `<div class="stationBox stationBox${index}"> 
                        <div class="stationBox-container">
                            <h3> Station name: '${name}'</h3> 
                            <button class="removeStation" onclick="removeStation(${index})">Remove</button>
                            <button class="removeStation" onclick="zoomToChosenStation(${index})">Visa station</button>
                        </div>
                      </div>`;

    return stationDiv;
}

function appendStationToField(index){
    let container = $("#stationList-container");
    
    container.append(getStationBox(index, chosenStations[index].name));
}

function showStationFieldButton(){
    $("#stationList-buttons").show();
    
}

function hideStationButton(){
    $("#stationList-buttons").hide();
    $("#stationList-container:visible").hide()
}

function zoomToChosenStation(index){
    let i = findIndexOfStation(chosenStations[index]);

    zoomToStation(i);
}

/** 
 * Zoom and pan the map to a specific station in stationData array
 * @param {number} index to a specific station in stationData array
 */ 
function zoomToStation(index){
    var latlng = L.latLng(stationsData[index].lon, stationsData[index].lat);
    map.flyTo(latlng, 9,{
        animate: true,
        duration: 2
    });
    
}