// lock and unlock map dragging when hovering over suggestion-field
$("#station-list").mouseenter( function(){
    map.dragging.disable();
}).mouseleave(function(){
    map.dragging.enable();
});


function addStationBox(station, marker, button){
    const stationBox = `<div id='${station.id}' class="station-box">
                            <h3> Station name: '${station.name}'</h3> 
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

function showStationFieldButton(){
    $("#stationlist-button").show();
    $("#remove-all-button").show();
    $("#graph-button").show();
    
}

function hideStationButton(){
    $("#stationlist-button").hide();
    $("#remove-all-button").hide();
    $("#graph-button").hide();
    $("#station-list:visible").hide();
}

function zoomToChosenStation(index){
    let i = findIndexOfStation(chosenStations[index]);

    zoomToStation(i);
}

/** 
 * Zoom and pan the map to a specific station in stationData array
 * @param {number} index to a specific station in stationData array
 */ 
function zoomToStation(station){
    var latlng = L.latLng(station.lon, station.lat);
    map.flyTo(latlng, 9,{
        animate: true,
        duration: 2
    });
    
}