/**
 * All the chosen stations are stored in this array.
 */
let chosenStations = [];

/**
 * Every station JSON object is stored in this array.
 */
let stationsData = [];
/**
 * All the chosen counties are stored in this array.
 */
let chosenCounties = [];

/**
 * The latest weather data is stored in this array.
 */
let latestWeatherData = [];

/**
 * Used to send out an alert of to 
 */
let warningFlag = true;

/*
 * Returns all station JSON object
 */
async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {

        stationsData = stations;
    });    
}

/**
 * 
 * @param {*} station 
 * @param {*} marker 
 * @param {*} button 
 */
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

/**
 * Adds a station to chosenStations array
 * @param {*} station a station data JSON object
 * @param {*} marker a Leaflet marker object
 * @param {*} button a HTML button
 */
function addStation(station, marker, button){
    // Style
    button.innerText = "Ta bort";
    button.className = "remove-button";
    marker.setIcon(selectedIcon);
    addStationBox(station, marker, button);
    // Add to chosenstation array to be used by graph
    chosenStations.push(station);
    if((chosenStations.length + chosenCounties.length > 10) && warningFlag){
        warningFlag = false;
        alert("letning, många stationer har valts. Detta kan göra graferna otydliga.");
    }
    
}

/**
 * Removes all chosen stations, chosen counties, marked stations and all drawn figures.
 */
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
    warningFlag = true;
}

/**
 * Decides if a station is added or removed from chosenStations array
 * @param {*} station a station data JSON object
 * @param {*} marker a Leaflet marker object
 * @param {*} button a HTML button
 */
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

/**
 * Use this function to show the station list and button container. Should only be used if no stations or counties has been added earlier.
 */
function showStationBar() {
    updateStationField();
    showStationFieldButton();
}

/**
 * Removes a specific chosen county from the chosen counties array
 * @param {*} countyCode the county code number
 * @param {*} button a HTML button linked to the county
 */
function removeCounty(countyCode, button){
    button.innerText = "Lägg till";
    button.className = "add-button"
    $('div[class=station-box][id="' + countyCode + '"]').remove();
    for(let i = 0; i < chosenCounties.length; i++) {
        if(chosenCounties[i] === countyCode) {
            chosenCounties.splice(i, 1);
        }
    }
    if(chosenCounties.length === 0 && chosenStations.length === 0) {
        updateStationField();
        hideStationButton();
    } 
}

/**
 * Adds a county to the chosen county array
 * @param {*} countyCode the county code number
 * @param {*} coords the map coordinates where the user clicked.
 * @param {*} button a HTML button
 */
function addChosenCounty(countyCode, coords, button){
    if(chosenCounties.length == 0 && chosenStations == 0) {
        showStationBar();
    }
    button.innerText = "Ta bort";
    button.className = "remove-button";
    addCountyBox(countyCode, button, coords);
    chosenCounties.push(countyCode);
}