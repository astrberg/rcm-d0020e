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


function removeStation(station, marker, button){
    
    // remove the station box from the field container
    //$(".stationBox"+index).remove();
        
    // change the "remove" button to a "add" button
    // changeButtonState(chosenStations[index], "add");

    // remove the station from the list
    //chosenStations[index] = null;
    button.className = "add-button";
    button.innerText = "Lägg till";

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
function addStation(station, marker){

    marker.setIcon(selectedIcon);

    chosenStations.push(station);

    // change the "add" button to a "remove" button
    // changeButtonState(station, "remove");
    // button.className = "remove-button";
    // button.innerText = "Ta bort";

    showStationFieldButton(); 


    // add the station to the field if the field is open
    // appendStationToField(chosenStations.length-1);

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker, button){
    // marker.setIcon(icon);

    if(!chosenStations.includes(station)){
        addStation(station, marker);
        addStationBox(button);
    }else{
        //let index = findIndexOfStation(station);
        removeStation(station, marker);
        marker.setIcon(icon);


    }

}