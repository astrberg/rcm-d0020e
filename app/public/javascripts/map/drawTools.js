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
 
//TODO: Edit now empties list for both rectangle and circle, needs a separate list for both types
map.on(L.Draw.Event.EDITED, function (event) {
    var layers = event.layers;
    
    layers.eachLayer(function (layer) {
        removeStationsOutsideDrawnItem();
    });
});

map.on(L.Draw.Event.DELETED, function (event) {
    removeMarkedStations();
    drawnCircleLayers = [];
    drawnRectLayers = [];
});
var drawnRectLayers = []; 
var drawnCircleLayers = [];  
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
function removeMarkedStations(){
    for(var i = 0; i < markedStations.length; i++){
        let stationId = markedStations[i]._popup._content.lastChild.id;
        var button = markedStations[i]._popup._content.lastChild;
        var station = stationByID(stationId);
        removeStation(station, markedStations[i], button);
    }
    markedStations = [];
}
//TODO: BROKEN
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

function addMarked(layer_elem){
    let stationID = layer_elem._popup._content.lastChild.id;
    var button = layer_elem._popup._content.lastChild;
    var station = stationByID(stationID);
    if(!markedStations.includes(layer_elem)) {
        markedStations.push(layer_elem);
        addStation(station, layer_elem, button);
        showStationBar();

    } else {
        console.log("already in");
        showStationBar();
    }    
}

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

function stationByID(stationID) {
    for(var i = 0; i < stationsData.length; i++) {
        if(stationsData[i].id == stationID) {
            return stationsData[i];
        }
    }
}