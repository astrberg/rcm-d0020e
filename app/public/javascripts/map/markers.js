/**
 * The default icon for a station marker.
 */
const icon = L.divIcon({
    className: 'fas fa-map-pin fa-2x',
    iconAnchor: [12, 24],
    popupAnchor: [-5, -25],
});
/**
 * The station marker icon when a station is chosen.
 */
const selectedIcon = L.divIcon({
    className: 'fas fa-map-pin fa-3x',
    iconAnchor: [15, 34],
    popupAnchor: [-5, -35]
});

/**
 * Adds station markers to the map based on the zoom level.
 * @param {*} group a Leaflet layer group with markers.
 */
function addMarkerOnZoom(group){
    for(var i = 0; i <= group; i++){
        if(!map.hasLayer(layerGroups[i])){
            if(map.getZoom() < 10){
                map.addLayer(layerGroups[i]);
            }
        }
    }
}

/**
 * Removes station markers from the map based on the zoom level.
 * @param {*} group a Leaflet layer group with markers.
 */
function removeMarkerOnZoom(group){
    for(var i = 9; i > group; i--){
        if(map.hasLayer(layerGroups[i])){
            if(map.getZoom() < 10){
                map.removeLayer(layerGroups[i]);
            }
        }
    }
    
}

/**
 * Should contain layergroups of markers.
 */
let layerGroups = [];

/**
 * Adds a station to a specific layer group.
 * @param {*} station a station data JSON object.
 * @param {*} layerNumber specifies in what layer group the station belongs to.
 */
function addStationToLayer(station, layerNumber){
    const id = "marker"+station.id;
    var marker = L.marker([station.lon, station.lat],{myCustomId: id});
    marker.setIcon(icon);


    if(!layerGroups[layerNumber]) {
        layerGroups[layerNumber] = new L.layerGroup();
    }

    layerGroups[layerNumber].addLayer(marker);    
    
    marker.bindPopup(addPopup(station,marker));
    marker.on('click', function(){
        if(marker.getPopup().isOpen()){
            marker.getPopup().setContent(addPopup(station,marker));
            this.openPopup();
        }else{
            map.closePopup();
        }
    });
}

/**
 * Use this method to create the group layers that contains markers.
 * @param {*} stations station data JSON array.
 */
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
