
function getStations() {
    $.getJSON("/api/getStationData", function(stations) {
        createLayers(stations);
        stationsData = stations;
    });    
}



