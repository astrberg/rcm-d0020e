
async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {
        createLayers(stations);
        stationsData = stations;
    });    
}



