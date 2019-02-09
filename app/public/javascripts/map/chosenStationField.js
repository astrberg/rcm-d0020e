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
    $("#station-list:visible").hide()
}