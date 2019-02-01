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
function removeStationViaButton(station){
    var button = document.getElementById("buttonid:" + station.id);
    button.className = "add-button";
    button.innerText = "Lägg till";


    let index = 0;

    // find the clicked station in the list of chosen stations
    for(var i = 0; i < chosenStations.length; i++){
        if(chosenStations[i] == station){
            removeStation(i);
            break;
        }
    }
}

// gets a station and the index of the station in the chosenStation list
function removeStation(index){
    var stationBox = ".stationBox"+index;
    
    // remove the station box from the field container
    $(stationBox).remove();

    // remove the station from the list
    removeStationFromList(index);
}

function removeStationFromList(index){

    chosenStations[index] = null;
    
    let isEmptyList = true;

    // check if the list only contains null elements
    for(var i = 0; i < chosenStations.length; i++){
        if(chosenStations[i] != null){
            isEmptyList = false;
        }
    }

    // if only null elements exist the list is considered empty
    // empty the list and hide the button
    if(isEmptyList){
        emptyList();
    }
}



// Adds a station to chosenStations array
function addStation(station){
    var button = document.getElementById("buttonid:" + station.id);
    button.className = "remove-button";
    button.innerText = "Ta bort";
    chosenStations.push(station);
    showStationButton();

    // add the station to the field if the field is open
    appendStationToField(chosenStations.length-1);

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station){

    if(!chosenStations.includes(station)){
        addStation(station);
    }else{
        removeStationViaButton(station);
    }
}