var chosenStations = [];
// var chosenMarkers = [];
var stationsData = [];


async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {

        createLayers(stations);
        stationsData = stations;

    });    
}


// function findStation(stationId) {

//     for(let i = 0; i < chosenStations.length; i++) {
//         if(chosenStations[i].id === stationId) {
//             return i;

//         }
//     }
//     return -1;

// }


function removeStation(station, marker, button){
    

    let i = chosenStations.findIndex(x => x.id === station.id);

    if(i != undefined) {
        button.innerText = "Lägg till";
        button.className = "add-button";
        marker.setIcon(icon);
        $(document.getElementById(station.id)).remove();
        chosenStations.splice(i, 1);

    }


    

}
// {/* <button class="remove-button" onclick='removeStation("${station.id}")' >Ta bort</button> */}
// {/* <button class="remove-button">Ta bort</button> */}
function addStationBox(station, marker, button){
    var stationBox = `<div id='${station.id}' class="station-box">
                            <h3> Station name: '${station.name}'</h3> 
                      </div>`;
    let buttonList = $('<button/>', {
        class: "remove-button",
        text: "Ta bort",
        // id: station.id,
        click: function () { removeStation(station, marker, button) }
    });
    var $stationList = $("#station-list");
    $stationList.append($(stationBox).append(buttonList));
    console.log(station, marker, button);    
}



// Adds a station to chosenStations array
function addStation(station, marker, button){

    button.innerText = "Ta bort";
    button.className = "remove-button";

    marker.setIcon(selectedIcon);
    

    addStationBox(station, marker);

    chosenStations.push(station);

    

}



// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker, button){
    

    if(!(chosenStations.find(x => x.id === station.id))) {
        addStation(station, marker, button);
    } else {
        removeStation(station, marker, button);
    }
}
