var chosenStations = [];
var stationsData = [];
var chosenCounties = [];
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
        $('div[class=station-box][id="' + station.id + '"]').remove()
        chosenStations.splice(i, 1);

    }
    // Toggle field
    if(chosenStations.length === 0 && chosenCounties.length === 0) {
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
    $("#station-list .remove-button").click();
    chosenStations = [];
    chosenCounties = [];
    markedStations = [];
    for(let i = 0; i < drawnRectLayers.length; i++){
        map.removeLayer(drawnRectLayers[i]);
    }
    for(let i = 0; i < drawnCircleLayers.length; i++){
        map.removeLayer(drawnCircleLayers[i]);
    }
}
// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker, button){
    // Toggle field
    
    if(!(chosenStations.find(x => x.id === station.id))) {
        if(chosenStations.length === 0 && chosenCounties.length === 0) {
            showStationBar();
        }
        addStation(station, marker, button);

    } else {
        removeStation(station, marker, button);

    }
}

function showStationBar() {
    updateStationField();
    showStationFieldButton();
}

function removeCounty(countyCode, button){
    button.innerText = "Lägg till";
    button.className = "add-button"
    $('div[class=station-box][id="' + countyCode + '"]').remove();
    for(var i = 0; i < chosenCounties.length; i++) {
        if(chosenCounties[i] === countyCode) {
            chosenCounties.splice(i, 1);
        }
    }
    if(chosenCounties.length === 0 && chosenStations.length === 0) {
        updateStationField();
        hideStationButton();
    } 
}

function addChosenCounty(countyCode, coords, button){
    if(chosenCounties.length == 0 && chosenStations == 0) {
        showStationBar();
    }
    button.innerText = "Ta bort";
    button.className = "remove-button";
    addCountyBox(countyCode, button, coords);
    chosenCounties.push(countyCode);
}