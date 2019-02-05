/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);

var averageData = [];
var geoJson;
/**
 * The layer for the Leaflet map
 */
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
standardTileLayer.addTo(map);


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
 * Adds a station marker with popup to a map layer
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
    var popupContent = popupContentSetup(station);
    marker.bindPopup(popupContent);
    marker.on('click', async function(){
        await getLatestWeatherData(station, this);
    });
    
}

// returns the popup for a new station marker
function popupContentSetup(station){
    var div = document.createElement("div");
    div.id = "popupid:" + station.id;
    
    var center = document.createElement("div");
    center.className = "center";
    
    var button = document.createElement("button");
    button.id = "buttonid:" + station.id;
    button.className = "add-button";
    button.innerText = "Lägg till";
    button.addEventListener('click', function(){
         handleChosenStations(station);
    });

    center.appendChild(button);
    
    var content = document.createElement("P");
    content.className = "popup-content";
    content.innerHTML = 
        'Station: ' + station.name + '<br>' +
        'Län: ' + countyNames[station.county_number] + '<br>' + 
        'Lufttemperatur: <br>' +
        'Vägtemperatur: <br>' +
        'Luftfuktighet: <br>' +
        'Vindhastighet: <br>' +
        'Vindriktning: <br>';
    div.appendChild(content);
    div.appendChild(center);

    return div;
}

// Adds a station to chosenStations array
function addStation(station, marker){
    
    marker.setIcon(selectedIcon);

    var button = document.getElementById("buttonid:" + station.id);
    button.className = "remove-button";
    button.innerText = "Ta bort";
    chosenStations.push(station);
    console.log("Added station: " + station.id + " to chosenStations.");
    console.log("Added station name: " + station.name + " to chosenStations.") 
    console.log("chosenStations length: " + chosenStations.length);

}

// Removes a station from chosenStations array
function removeStationViaButton(station, marker){
    marker.setIcon(icon);

    var button = document.getElementById("buttonid:" + station.id);
    button.className = "add-button";
    button.innerText = "Lägg till";
    
    removeStation(station);
}

function removeStationViaList(station, index){
    console.log("remove box");
    var test = ".stationBox"+index;
    console.log(test);
    $(test).remove();
    removeStation(station);
}

function removeStation(station){
    for(var i = 0; i <chosenStations.length; i++){
        if(chosenStations[i] == station){
            chosenStations.splice(i,1);
            console.log("Removed station: " + station.id + " from chosenStations.");
            console.log("Added station name: " + station.name + " to chosenStations.");
            console.log("chosenStations length: " + chosenStations.length);
            return;
        }
    }
}

// Checks if a station is added or removed from chosenStations array
function handleChosenStations(station, marker){

    if(!chosenStations.includes(station)){
        addStation(station, marker);
    }else{
        removeStationViaButton(station, marker);
    }
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

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Sverige medeltemperatur per län</h4>' +  (props ?
        '<b>' + props.name + '</b><br />'   + averageData[props.countyCode][1].toFixed(1) + '\xB0C'
        : 'Hovra över län');
};
info.addTo(map);

function getColor(d) {
    return  d > 35  ? '#CC0000' :
            d > 30  ? '#FF0000' :
            d > 25 ? '#FF3333' :
            d > 20  ? '#CC6600' :
            d > 15   ? '#FF8000' :
            d > 10   ? '#FF9933' :
            d > 5   ? '#FFB266' :
            d > 0  ? '#FFCC99' :


            d > -5  ? '#99DDFF' :
            d > -10 ? '#66CDFF' :
            d > -15  ? '#3399FF' :
            d > -20   ? '#0080FF' :
            d > -25   ? '#0066CC' :
            d > -30   ? '#3333FF' :
            d > -35   ? '#0000FF' :
                        '#000099';
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

//Adds the Swedish countys to the map with some css styling

function drawMap() {
    geojson = L.geoJson(countyData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
}
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
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  var type = e.layerType
  var layer = e.layer;

  // Do whatever else you need to. (save to db, add to map etc)
  drawnItems.addLayer(layer);
});

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        scales = [35, 30, 25, 20, 15, 10, 5, 0, -5, -10, -15, -20, -25, -30, -35],
        labels = [];
    for (var i = 0; i < scales.length; i++) {
        if(i == 0){
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + scales[i] + '+ <br> ';
        }else if(i == scales.length -1) {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + scales[i] + '- ';
        }else {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + (scales[i]) + '<br>';
    }
}
    return div;
};
legend.addTo(map);

