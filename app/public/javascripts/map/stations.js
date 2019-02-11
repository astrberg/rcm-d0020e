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
    $("#stationList-container").empty();
}

// Removes a station from chosenStations array
function findIndexOfChosenStation(station){
    // find the clicked station in the list of chosen stations
    for(let i = 0; i < chosenStations.length; i++){

        if(chosenStations[i] === station){
            return i;
        }
    }  
}

// Removes a station from stationsData array
function findIndexOfStation(station){
    // find the clicked station in the list of chosen stations
    for(let i = 0; i < stationsData.length; i++){

        if(stationsData[i] === station){
            return i;
        }
    }  
}


function removeStation(index){

    // remove the station box from the field container
    $(".stationBox"+index).remove();
        
    // change the "remove" button to a "add" button
    changeButtonState(chosenStations[index], "add");

    // remove the station from the list
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
        hideStationButton();
    }
}



// Adds a station to chosenStations array
function addStation(station){

    chosenStations.push(station);

    // change the "add" button to a "remove" button
    changeButtonState(station, "remove");

    showStationFieldButton();

    // add the station to the field if the field is open
    appendStationToField(chosenStations.length-1);

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station){
    if(!chosenStations.includes(station)){
        addStation(station);
    }else{
        let index = findIndexOfChosenStation(station);
        removeStation(index);
    }
}