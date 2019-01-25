


function getStations() {
    $.getJSON("/api/getStationData", function(stations) {

        console.log(stations[0].lat);


    });    


}

