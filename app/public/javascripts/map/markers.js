
var icon = L.divIcon({
    className: 'fa fa-map-marker fa-2x',
    iconAnchor: [12, 24],
    popupAnchor: [-5, -25]
});
var selectedIcon = L.divIcon({
    className: 'fa fa-map-marker fa-3x',
    iconAnchor: [15, 34],
    popupAnchor: [-5, -35]
});


function addMarkerOnZoom(group){
    for(var i = 0; i <= group; i++){
        if(!map.hasLayer(layerGroups[i])){
            map.addLayer(layerGroups[i]);
        
        }
    }
}

function removeMarkerOnZoom(group){
    for(var i = 9; i > group; i--){
        if(map.hasLayer(layerGroups[i])){
            map.removeLayer(layerGroups[i]);
        
        }
    }
    
}

/**
 * Adds a station marker with popup content to a map layer
 */
var layerGroups = [];
var timer = Date.now();

function addStationToLayer(station, layerNumber){
    var marker = L.marker([station.lon, station.lat]);
    marker.setIcon(icon);


    if(!layerGroups[layerNumber]) {
        layerGroups[layerNumber] = new L.layerGroup();
    }

    layerGroups[layerNumber].addLayer(marker);    
    
    // Add popup content
    addPopup(station, marker);
   

    // marker.on('click', function(){
                
    //     let dataText = [" \xB0C", " \xB0C", " %", " m/s", ""];
    //     let data = ["air_temperature", "road_temperature", "air_humidity", "wind_speed", "wind_direction"];
    //     let markerDiv = document.getElementById("marker-data");
    //     if(markerDiv != null) {
    //         let index = getLatestWeatherIndex(station);
            
    //         for(let i = 0; i < 4; i++) {
    //             markerDiv.rows[i + 2].cells[1].innerHTML = latestWeatherData[index][data[i]] + dataText[i];
    //         }
    //         markerDiv.rows[6].cells[1].innerHTML =  windDirection(latestWeatherData[index][data[4]]);
            
    //     }   
    // });


}

function createLayers(stations){
    // add every tenth station to the first layer
    for(var i = 0; i< stations.length; i+=10){
        addStationToLayer(stations[i], 0);
    }

    // add every fifth station to the jth layer
    for(var j = 0; j < 5; j++){
        for(var i = j; i< stations.length; i+=5){
            // skip every tenth station
            if(i % 10 != 0){

                // merge the fourth and fifth layers into one
                if(j == 4){
                    addStationToLayer(stations[i], j);
                }else{
                    addStationToLayer(stations[i], j+1);
                }
                
            }
        }
    }

    map.addLayer(layerGroups[0])
}
