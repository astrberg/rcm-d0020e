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
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeStation(station, marker, button) }
    });
    const $stationList = $("#station-list");
    $stationList.append($(stationBox).append(buttonList));
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
    
}

function hideStationButton(){
    $("#stationlist-button").hide();
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
function zoomToStation(index){
    var latlng = L.latLng(stationsData[index].lon, stationsData[index].lat);
    map.flyTo(latlng, 9,{
        animate: true,
        duration: 2
    });
    
}