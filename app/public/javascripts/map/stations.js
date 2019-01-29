
function getStations() {
    $.getJSON("/api/getStationData", function(stations) {
        displayStations(stations);
    });    
}



