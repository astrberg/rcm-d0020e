var chosenStations = [];
var stationsData = [];


async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {

        createLayers(stations);
        stationsData = stations;

    });    
}

function emptyList(){
    chosenStations = [];
    hideStationButton();
}

// Removes a station from chosenStations array
function findIndexOfStation(station){
    // find the clicked station in the list of chosen stations
    for(var i = 0; i < chosenStations.length; i++){
        if(chosenStations[i] == station){
            return i;
        }
    }  
}


function removeStation(stationId){
    
    // remove the station box from the field container
    $(stationId).remove();
        
    // change the "remove" button to a "add" button
    // changeButtonState(chosenStations[index], "add");

    // find station and corresponding marker, station index + 1...
    let index = chosenStations.findIndex(x => x.id === stationId);
    let marker = chosenStations[index + 2];
    marker.setIcon(icon);
    if(index != undefined) {
        // remove station and marker from choosenstations
        chosenStations.splice(index, 1);
        chosenStations.splice(index, 1);
    }

    console.log(chosenStations);

}

function addStationBox(station){
    var stationBox = `<div id='${station.id}' class="station-box">
                            <h3> Station name: '${station.name}'</h3> 
                            <button class="remove-button" onclick="removeStation(${station.id})" >Ta bort</button>
                      </div>`;
    // $("station-box").on('click', removeStation.bind(this, marker));
    $("#station-list").append(stationBox);
    
}



// Adds a station to chosenStations array
function addStation(station, marker){

    addStationBox(station, marker);


    chosenStations.push(station, marker);

    console.log(chosenStations);

    

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker){
    // marker.setIcon(icon);

    if(!chosenStations.includes(station)){
        addStation(station, marker);
        marker.setIcon(selectedIcon);

    }else{
        //let index = findIndexOfStation(station);
        removeStation(station, marker);
        marker.setIcon(icon);

    }

}