/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);

var averageData = [];
var markedStations = [];
var geoJson;
/**
 * The layer for the Leaflet map
 */
var swedenRoads = 'http://{s}.tile.openstreetmap.se/osm/{z}/{x}/{y}.png';
var roadTileLayer = L.TileLayer.boundaryCanvas(swedenRoads, {
    maxZoom: 15,
    minZoom: 5,
    maxBoundsViscosity: 1.0,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    boundary: countyData
});

var mapboxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnVnbWFuYSIsImEiOiJjanJhbXVqbmowcmQzNDRuMHZhdzNxbjkxIn0.x1rFh-zIo8WfBRfpj2HsjA';
var standardTileLayer = L.TileLayer.boundaryCanvas(mapboxURL, {
    maxZoom: 9,
    minZoom: 5,
    maxBoundsViscosity: 1.0,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    boundary: countyData
});



/**
 * Restrict the map movement
 */
var southWest = L.latLng(54,9),
    northEast = L.latLng(72, 32);
var bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


map.on('zoomend', function() {
    // Difference between zoom level and group number = 5
    addMarkerOnZoom(map.getZoom()-5);
    removeMarkerOnZoom(map.getZoom()-5);

});

var info = L.control();



info.onAdd = function (map) {
    this._map = map;
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Sverige medeltemperatur per län</h4>' +  (props ?
        '<b>' + props.name + '</b> ' +
        '<br /> Lufttemperatur: '   + averageData[props.countyCode][1].toFixed(1)+ '\xB0C'+
        '<br /> Vägtemperatur: ' + averageData[props.countyCode][2].toFixed(1) + '\xB0C'
        : 'Hovra över län');
    
};
info.addTo(map);


function getColor(d) {
    return  d > 35  ? '#990000' :
            d > 30  ? '#CC0000' :
            d > 25 ? '#FF0000' :
            d > 20  ? '#FF3333' :
            d > 15   ? '#FF6666' :
            d > 10   ? '#FF9999' :
            d > 5   ? '#FFCCCC' :
            d > 0  ? '#FFDCDC' :


            d > -5  ? '#CCE5FF' :
            d > -10 ? '#99CCFF' :
            d > -15  ? '#66B2FF' :
            d > -20   ? '#3399FF' :
            d > -25   ? '#0080FF' :
            d > -30   ? '#0066CC' :
            d > -35   ? '#004C99' :
                        '#003366';
}

function style(feature) {
    var avg = averageData[feature.properties.countyCode];
    return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(avg[1])
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

//Adds the Swedish countys to the map with some css styling
function drawMap() {
    document.getElementById('county').checked = 'true';
    map.removeLayer(roadTileLayer);
    standardTileLayer.addTo(map);
    geojson = L.geoJson(countyData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
}

function drawRoads(){
    document.getElementById('road').checked = 'true';
    map.removeLayer(geojson);
    map.removeLayer(standardTileLayer);
    roadTileLayer.addTo(map);
}


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        scales = [35, 30, 25, 20, 15, 10, 5, 0, -5, -10, -15, -20, -25, -30, -35],
        labels = [];
    for (var i = 0; i < scales.length; i++) {
        if(i == 0){
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i> >' + scales[i] + '<br> ';
        }else if(i == scales.length -1) {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i> <' + scales[i];
        }else {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i> ' + (scales[i]) + '<br>';
    }
}
    return div;
};
legend.addTo(map);