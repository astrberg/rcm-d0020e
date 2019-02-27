var chosenStations = [];
var stationsData = [];
var latestWeatherData = [];

async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {

        stationsData = stations;
    });    
}

function removeStation(station, marker, button){

    const i = chosenStations.findIndex(x => x.id === station.id);

    if(i != undefined) {
        button.innerText = "Lägg till";
        button.className = "add-button";
        marker.setIcon(icon);
        $('div[class=station-box][id="' + station.id + '"]').remove();
        chosenStations.splice(i, 1);

    }
    // Toggle field
    if(chosenStations.length === 0) {
        updateStationField();
        hideStationButton();
    } 

}


// Adds a station to chosenStations array
function addStation(station, marker, button){
    // Style
    button.innerText = "Ta bort";
    button.className = "remove-button";
    marker.setIcon(selectedIcon);
    addStationBox(station, marker, button);
    // Add to chosenstation array to be used by graph
    chosenStations.push(station);
    

}


function removeAllStations() {
    // DO YOU SEE THIS SHIT! NEEEEEEEEEEEEEEEEEEETH
    $("#station-list .remove-button").click();
    chosenStations = [];

}
// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker, button){
    // Toggle field
    if(chosenStations.length === 0) {
        showStationFieldButton();

    }
    if(!(chosenStations.find(x => x.id === station.id))) {
        addStation(station, marker, button);

    } else {
        removeStation(station, marker, button);

    }
}
