var chosenStations = [];
var stationsData = [];


async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {

        createLayers(stations);
        stationsData = stations;

    });    
}



// Removes a station from chosenStations array
function removeStationViaButton(station){
    var button = document.getElementById("buttonid:" + station.id);
    button.className = "add-button";
    button.innerText = "Lägg till";
    
    removeStation(station);
}

function removeStationViaList(station, index){
    console.log("remove box");
    var test = ".stationBox"+index;
    console.log(test);
    $(test).remove();
    removeStation(station);
}

function removeStation(station){
    for(var i = 0; i <chosenStations.length; i++){
        if(chosenStations[i] == station){
            chosenStations.splice(i,1);
            console.log("Removed station: " + station.id + " from chosenStations.");
            console.log("chosenStations length: " + chosenStations.length);
            break;
            
        }
    }

    if(chosenStations.length === 0){
        hideStationButton();
    }
}


// Adds a station to chosenStations array
function addStation(station){
    var button = document.getElementById("buttonid:" + station.id);
    button.className = "remove-button";
    button.innerText = "Ta bort";
    chosenStations.push(station);
    showStationButton("");
    console.log("Added station: " + station.id + " to chosenStations.");
    console.log("Added station name: " + station.name + " to chosenStations.") 
    console.log("chosenStations length: " + chosenStations.length);

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station){

    if(!chosenStations.includes(station)){
        addStation(station);
    }else{
        removeStationViaButton(station);
    }
}