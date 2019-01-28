/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);
var chosenStations = [];
/**
 * The layer for the Leaflet map
 */
var mapboxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnVnbWFuYSIsImEiOiJjanJhbXVqbmowcmQzNDRuMHZhdzNxbjkxIn0.x1rFh-zIo8WfBRfpj2HsjA';
var standardTileLayer = L.TileLayer.boundaryCanvas(mapboxURL, {
    maxZoom: 18,
    minZoom: 5,
    maxBoundsViscosity: 1.0,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    boundary: countyData
});
standardTileLayer.addTo(map);


/**
 * Restrict the map movement
 */
var southWest = L.latLng(54.57206165565852,8.61328125),
    northEast = L.latLng(69.31832006949072, 27.94921875);
var bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


map.on('zoomend', function() {
    // Difference between zoom level and group number = 4
    addMarkerOnZoom(map.getZoom()-4);
    removeMarkerOnZoom(map.getZoom()-4);
});

function addMarkerOnZoom(group){
    for(var i = 0; i <= group; i++){
        if(!map.hasLayer(layerGroups[i])){
            map.addLayer(layerGroups[i]);
        
        }
    }
    console.log(layerGroups[group]);
}

function removeMarkerOnZoom(group){
    for(var i = 10; i >= group; i--){
        if(map.hasLayer(layerGroups[i])){
            map.removeLayer(layerGroups[i]);
        
        }
    }
    
}


/**
 * Adds a station marker to the map
 */

var layerGroups = [];

function addStationToMap(station, layerNumber){
    var marker = L.marker([station.lon, station.lat]);
    var icon = marker.options.icon;
    //icon.options.iconSize = [17,15];
    icon.options.shadowSize = [0,0];
    marker.setIcon(icon);
    
    if(!layerGroups[layerNumber]) {
            layerGroups[layerNumber] = new L.layerGroup();
    }

    layerGroups[layerNumber].addLayer(marker);
    // map.addLayer(layerGroups[station.county_number]);
    
    
    marker.bindPopup('<div id = "popupid:' + station.id + '" class="popup" >' + 
    'Station: ' + station.name + '<br>' +
    'Landskap: ' + station.county_number + '<br>');
    // 'Vägtemperatur: ' + station.roadTemp + '<br>' +
    // 'Luftfuktighet: ' + station.humidity + '<br>' +
    // 'Vind: ' + station.windSpeed + '<br>' +
    // 'Vindriktning: ' + station.windDirection + '<br>' +
    // '<div class="center"><button id="buttonid:' + station.id +'" onclick="addChosenStation('+station.id+')" class="button" >Lägg till</button></div>');
    
}


function displayStations(stations){
    var count = 0;
    for(var j = 0; j < 5; j++){
        for(var i = j; i< stations.length; i+=5){
            
            addStationToMap(stations[i], j);
            count++;
        }
        //console.log(j);
    }

    map.addLayer(layerGroups[0])
}

function addChosenStation(station_id){
    if(!chosenStations.includes(station_id)){
        chosenStations.push(station_id);
        console.log("Added station: " + station_id + " to chosenStations.");
    }else{
        console.log("Station is already chosen");
    }

    
    
}
var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};
info.update = function (props) {
    this._div.innerHTML = '<h4>Sverige medeltemperatur realtid</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.temperature + ' grader celsius'
        : 'Hovra över län');
};

info.addTo(map);

function getColor(d) {
    return d > 50 ? '#800026' :
            d > 40  ? '#BD0026' :
            d > 30  ? '#E31A1C' :
            d > 20 ? '#FC4E2A' :
            d > 10  ? '#FD8D3C' :
            d > 5   ? '#FEB24C' :
            d > 2   ? '#FED976' :
                        '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.temperature)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
var geojson = L.geoJson(countyData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

