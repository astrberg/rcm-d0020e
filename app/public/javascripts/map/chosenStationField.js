// lock and unlock map dragging when hovering over suggestion-field
$("#station-list").mouseenter( function(){
    map.dragging.disable();
}).mouseleave(function(){
    map.dragging.enable();
});

/**
 * When a station is added, the station will appear in the chosen station/county list.
 * @param {JSON} station a JSON object with station data
 * @param {*} marker a station L.Marker 
 * @param {*} button a html button
 */
function addStationBox(station, marker, button){
    const stationBox = `<div id='${station.id}' class="station-box">
                            <h3> Station: ${station.name}</h3> 
                      </div>`;
    const buttonList = $('<button/>', {
        id: station.id,
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeStation(station, marker, button) }
    });
    const buttonGoToStation = $('<button/>', {
        class: "button",
        text: "Gå till station",
        click: function () { zoomToStation(station) }
    });
    const $stationList = $("#station-list");
    $stationList.append($(stationBox).append(buttonGoToStation, buttonList));
}

/**
 * When a county is added, the county will appear in the chosen station/county list.
 * @param {*} countyCode the county code number.
 * @param {*} button a html button.
 * @param {*} coords the coordinates where the user clicked.
 */
function addCountyBox(countyCode, button, coords) {
    const countyBox = `<div id='${countyCode}' class="station-box">
                            <h3> Län: ${countyNames[countyCode]}</h3> 
                      </div>`;
    const buttonList = $('<button/>', {
        id: countyCode,
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeCounty(countyCode, button) }
    });
    const buttonGoToCounty = $('<button/>', {
        class: "button",
        text: "Gå till Län",
        click: function () { zoomToCounty(coords) }
    });
    const $stationList = $("#station-list");
    $stationList.append($(countyBox).append(buttonGoToCounty, buttonList));
}

/**
 * This function will show or hide the station/county list
 */
function updateStationField(){
    const div = $("#station-list")

    if (div.is(":hidden")) {
        $("#stationlist-button").text("Göm valda stationer")
        div.show();
    } else {
        $("#stationlist-button").text("Visa valda stationer")
        div.hide();
    }
}

/**
 * This function enables the button container to show.
 */
function showStationFieldButton(){
    $(".button-container").show();
}

/**
 * This function enables the button container to hide.
 */
function hideStationButton(){
    $(".button-container").hide();
    $("#station-list:visible").hide();
}

/**
 * This function will zoom to a specific station marker based on the index argument.
 * @param {number} index of the chosen station in the chosenStation array.
 */
function zoomToChosenStation(index){
    let i = findIndexOfStation(chosenStations[index]);

    zoomToStation(i);
}

/** 
 * Zoom and pan the map to a specific station.
 * @param {JSON} station a specific station in stationData array.
 */ 
function zoomToStation(station){
    var latlng = L.latLng(station.lon, station.lat);
    map.flyTo(latlng, 9,{
        animate: true,
        duration: 2
    });
    
}
/**
 * Zoom and pan the map to a specific county based on user mouse click.
 * @param {*} coords the coordinates to the position where the user clicked.
 */
function zoomToCounty(coords){
    map.flyTo(coords, 7,{
        animate: true,
        duration: 2
    });
}