
async function getStations() {
    await $.getJSON("/api/getStationData", function(stations) {
        await createLayers(stations);
        stationsData = stations;
    });    
}



