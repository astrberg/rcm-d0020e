/**
 * All drawn rectangles are stored in this array 
 */
let drawnRectLayers = [];

/**
 * All drawn circles are stored in this array 
 */
let drawnCircleLayers = []; 

/**
 * Draw functionality
 */
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

/**
 * Initialise the draw control and pass it the FeatureGroup of editable layers
 */
const drawControl = new L.Control.Draw({
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

//Language
//Custom språk drawTools
L.drawLocal.draw.toolbar.buttons.rectangle = 'Rita en rektangel';
L.drawLocal.draw.toolbar.buttons.circle = 'Rita en cirkel';

L.drawLocal.draw.handlers.circle.radius  = 'Radie';

L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Klicka och drag för att rita en rektangel';
L.drawLocal.draw.handlers.circle.tooltip.start = 'Klicka och drag för att rita en cirkel';

L.drawLocal.draw.handlers.simpleshape.tooltip.end  = 'Släpp för att rita figur';

L.drawLocal.draw.toolbar.actions.title = 'Avbryt ritning';
L.drawLocal.draw.toolbar.actions.text = 'Avbryt';

L.drawLocal.edit.toolbar.actions.save.title = 'Spara ändringar';
L.drawLocal.edit.toolbar.actions.save.text = 'Spara';

L.drawLocal.edit.toolbar.actions.cancel.title = 'Avbryt ändringar';
L.drawLocal.edit.toolbar.actions.cancel.text = 'Avbryt';

L.drawLocal.edit.toolbar.buttons.edit = 'Redigera figur';
L.drawLocal.edit.toolbar.buttons.editDisabled = 'Inga figurer att redigera';
L.drawLocal.edit.toolbar.buttons.remove = 'Radera figur';
L.drawLocal.edit.toolbar.buttons.removeDisabled = 'Inga figurer att radera';
L.drawLocal.edit.toolbar.actions.clearAll.title = 'Tömmer alla figurer på stationer';
L.drawLocal.edit.toolbar.actions.clearAll.text = 'Töm alla';

L.drawLocal.edit.handlers.edit.tooltip.subtext = 'Drag figur i de vita handtagen för att redigera';
L.drawLocal.edit.handlers.edit.tooltip.text = 'Klicka avbryt för att ångra redigering';
L.drawLocal.edit.handlers.remove.tooltip.text = 'Klicka på en figur för att radera';


map.addControl(drawControl);
 
//Event for editing all drawn items, runs on "save"
map.on(L.Draw.Event.EDITED, function (event) {
    let layers = event.layers;
    layers.eachLayer(function (layer) {
        removeStationsOutsideDrawnItem();
    });
});

map.on(L.Draw.Event.DELETED, function (event) {
    let layers = event.layers;
    
    layers.eachLayer(function (layer) {
        if(layer instanceof L.Rectangle){
            for(let i = 0; i < drawnRectLayers.length; i++) {
                if(drawnRectLayers[i]._leaflet_id == layer._leaflet_id) {
                    drawnRectLayers.splice(i, 1);  
                }
            }
        }else if(layer instanceof L.Circle){
            for(let i = 0; i < drawnCircleLayers.length; i++) {
                if(drawnCircleLayers[i]._leaflet_id == layer._leaflet_id) {
                    drawnCircleLayers.splice(i, 1);  
                }
            }
        }
        
    });
    removeStationsOutsideDrawnItem();
});


//Event for creating drawn items.
map.on(L.Draw.Event.CREATED, function (event) {
    let layer = event.layer;
    let type = event.layerType;
    if(type == 'circle') {
        drawnCircleLayers.push(layer);
        getStationbyDrawCircle(layer);
    }
    if(type == 'rectangle') {
        let lat_lngs = [layer._latlngs[0],layer._latlngs[2]];
        drawnRectLayers.push(layer);
        getStationbyDrawRect(lat_lngs);
        
    }

    drawnItems.addLayer(layer);
});

/**
 * Removes stations marked by drawnItems only
 */
function removeMarkedStations(){
    for(let i = 0; i < markedStations.length; i++){
        let stationId = markedStations[i]._popup._content.lastChild.id;
        let button = markedStations[i]._popup._content.lastChild;
        let station = stationByID(stationId);
        removeStation(station, markedStations[i], button);
    }
    markedStations = [];
}
//Loops through all layergroups and each layer within them. 
//If the courners of a drawn rectangle contains the lats and longs of a marker, add that marker to markedStations and chosenStations
//Checks the circle center and the radius, if it contains the lats and longs of a marker, add that marker to markedStations and chosenStations
/**
 * Removes all markers that are outside a drawn figure
 */
function removeStationsOutsideDrawnItem() {
    removeMarkedStations();
    for(let i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i]; 
        layer_group.eachLayer(function(layer_elem){
            if(layer_elem instanceof L.Marker){
                for(let j = 0; j < drawnRectLayers.length; j++){  
                    if((L.latLngBounds(drawnRectLayers[j]._latlngs).contains(layer_elem.getLatLng()))){
                        addMarked(layer_elem);
                    }      
                }
                for(let k = 0; k < drawnCircleLayers.length; k++){
                    let radius = drawnCircleLayers[k].getRadius();
                    let circleCenter = drawnCircleLayers[k].getLatLng(); 
                    if(Math.abs(circleCenter.distanceTo(layer_elem.getLatLng())) <= radius){
                        addMarked(layer_elem);
                    }      
                }       
            }
        });
    }
}

/**
 * Called with create event, if the corners of a drawn rectangle contains any markers, add them to markedStations and chosenStations.
 * @param {*} lat_lngs The north east corner point and the south west corner point of a rectangle. 
 */
function getStationbyDrawRect(lat_lngs) {
    for(let i = 0; i < layerGroups.length; i++) {
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

/**
 * Function to add markers, identical function for all types of drawn Items. Checks if a station is already chosen to avoid dublicates.
 * @param {*} layer_elem a drawn figure.
 */
function addMarked(layer_elem){
    var stationID = layer_elem._popup._content.lastChild.id;
    const button = layer_elem._popup._content.lastChild;
    const station = stationByID(stationID);
    if(!chosenStations.includes(station)){
        if(!markedStations.includes(layer_elem)) {
            if(chosenCounties.length === 0 && chosenStations.length === 0){
                showStationBar();
            }
            markedStations.push(layer_elem);
            addStation(station, layer_elem, button);
        } else {
            console.log("Station is already chosen");
            //showStationBar();
        } 
    }    
}

/**
 * Gets the circleCenter and Radius of a drawn circle, if it contains any markers, add them to markedStations and chosenStations.
 * @param {*} circleLayer a drawn circle.
 */
function getStationbyDrawCircle(circleLayer) {
    const radius = circleLayer.getRadius();
    const circleCenter = circleLayer.getLatLng();
    for(let i = 0; i < layerGroups.length; i++) {
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

/**
 * Use this method to get a station based on the station id.
 * @param {*} stationID the station id of a specific station.
 */
function stationByID(stationID) {
    for(let i = 0; i < stationsData.length; i++) {
        if(stationsData[i].id == stationID) {
            return stationsData[i];
        }
    }
}