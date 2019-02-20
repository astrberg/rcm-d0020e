//Draw functionality
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    draw : {
        polyline : false,
        marker : false,
        circlemarker : false,
        polygon : false,
        rectangle : {
            shapeOptions: {
                color: 'purple'
               },
        },
        circle : {
            shapeOptions: {
                color: 'purple'
               },
        },
    },
  edit: {
    featureGroup: drawnItems,
    edit : true
  }
});
map.addControl(drawControl);
 
//Event for editing all drawn items, runs on "save"
map.on(L.Draw.Event.EDITED, function (event) {
    var layers = event.layers;
    
    layers.eachLayer(function (layer) {
        removeStationsOutsideDrawnItem();
    });
});
//Event for deleting one or all drawn items.
map.on(L.Draw.Event.DELETED, function (event) {
    removeMarkedStations();
    drawnCircleLayers = [];
    drawnRectLayers = [];
});
var drawnRectLayers = []; 
var drawnCircleLayers = [];  

//Event for creating drawn items.
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    var type = event.layerType;
    

    if(type == 'circle') {
        drawnCircleLayers.push(layer);
        getStationbyDrawCircle(layer);
    }
    if(type == 'rectangle') {
        var lat_lngs = [layer._latlngs[0],layer._latlngs[2]];
        drawnRectLayers.push(layer);
        getStationbyDrawRect(lat_lngs);
        
    }

    drawnItems.addLayer(layer);
});
//Removes stations marked by drawnItems only
function removeMarkedStations(){
    for(var i = 0; i < markedStations.length; i++){
        let stationId = markedStations[i]._popup._content.lastChild.id;
        var button = markedStations[i]._popup._content.lastChild;
        var station = stationByID(stationId);
        removeStation(station, markedStations[i], button);
    }
    markedStations = [];
}
//Loops through all layergroups and each layer within them. 
//If the courners of a drawn rectangle contains the lats and longs of a marker, add that marker to markedStations and chosenStations
//Checks the circle center and the radius, if it contains the lats and longs of a marker, add that marker to markedStations and chosenStations
function removeStationsOutsideDrawnItem() {
    removeMarkedStations();
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i]; 
        layer_group.eachLayer(function(layer_elem){
            if(layer_elem instanceof L.Marker){
                for(var j = 0; j < drawnRectLayers.length; j++){  
                    if((L.latLngBounds(drawnRectLayers[j]._latlngs).contains(layer_elem.getLatLng()))){
                        addMarked(layer_elem);
                    }      
                }
                for(var k = 0; k < drawnCircleLayers.length; k++){
                    var radius = drawnCircleLayers[k].getRadius();
                    var circleCenter = drawnCircleLayers[k].getLatLng(); 
                    if(Math.abs(circleCenter.distanceTo(layer_elem.getLatLng())) <= radius){
                        addMarked(layer_elem);
                    }      
                }       
            }
        });
    }
}
//Called with create event, if the courners of a drawn rectangle contains any markers, add them to markedStations and chosenStations
function getStationbyDrawRect(lat_lngs) {
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i];
        layer_group.eachLayer(function(layer_elem){
            if(L.latLngBounds(lat_lngs).contains(layer_elem.getLatLng())){
                if(layer_elem instanceof L.Marker) {
                    //StationID and button from the marker object
                    addMarked(layer_elem);
                }
            }
         });
    }
}
//Function to add markers, identical function for all types of drawn Items. Checks if a station is already chosen to avoid dublicates.
function addMarked(layer_elem){
    let stationID = layer_elem._popup._content.lastChild.id;
    var button = layer_elem._popup._content.lastChild;
    var station = stationByID(stationID);
    if(!markedStations.includes(layer_elem)) {
        markedStations.push(layer_elem);
        addStation(station, layer_elem, button);
        showStationBar();

    } else {
        console.log("Station is already chosen");
        showStationBar();
    }    
}
//Gets the circleCenter and Radius of a drawn circle, if it contains any markers, add them to markedStations and chosenStations
function getStationbyDrawCircle(circleLayer) {
    var radius = circleLayer.getRadius();
    var circleCenter = circleLayer.getLatLng();
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i];
        layer_group.eachLayer(function(layer_elem){
            if(Math.abs(circleCenter.distanceTo(layer_elem.getLatLng())) <= radius){
                if(layer_elem instanceof L.Marker) {
                    addMarked(layer_elem);                       
                }
            }
         });
    }

}
/*
*@param ID from a station
*@return Station from stationID, stored in stationsdata within database
*/
function stationByID(stationID) {
    for(var i = 0; i < stationsData.length; i++) {
        if(stationsData[i].id == stationID) {
            return stationsData[i];
        }
    }
}