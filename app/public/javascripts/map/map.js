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

// Popup content
function addPopup(station, marker) {
    var div = document.createElement("table-data");
    div.id = "popupid:" + station.id;
    div.innerHTML = 
    '<table id = "marker-data" >' +
            '<tr> <td> Station </td><td>' + station.name +'</td></tr>' + 
            '<tr> <td> Län: </td><td>' + countyNames[station.county_number] + '</td></tr>' + 
            '<tr> <td>Lufttemperatur: </td><td></td></tr>' +
            '<tr> <td>Vägtemperatur: </td><td></td></tr>' +
            '<tr> <td>Luftfuktighet: </td><td></td></tr>' +
            '<tr> <td>Vindhastighet: </td><td></td></tr>' +
            '<tr> <td>Vindriktning: </td><td></td></tr>' +
    '</table>';

    // Button
    var button = document.createElement("button");
    button.id = "buttonid:" + station.id;
    button.className = "add-button";
    button.innerText = "Lägg till";
    button.addEventListener('click', function(){
        handleChosenStations(station);
    });
    div.appendChild(button);
    marker.bindPopup(div);
}

function windDirection(data) {
    if(data == 'north') {
      return '&nbsp; <i class="fa fa-long-arrow-down"></i> <br>';
    }
    else if(data == 'south') {
      return '&nbsp; <i class="fa fa-long-arrow-up"></i> <br>';
    }
    else if(data == 'east') {
      return '&nbsp; <i class="fa fa-long-arrow-left"></i> <br>';
    }
    else if(data == 'west') {
      return '&nbsp; <i class="fa fa-long-arrow-right"></i> <br>';
    }
    else if(data == 'northEast') { //southWest
      return '&nbsp; <i class="fa fa-long-arrow-down" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'northWest') { //southEast
      return '&nbsp; <i class="fa fa-long-arrow-right" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southEast') { //northWest
      return '&nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate(45deg)"></i> <br>';
    }
    else if(data == 'southWest') { //northEast
      return '&nbsp; <i class="fa fa-long-arrow-left" style="transform: rotate(45deg)"></i> <br>';
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
   

    marker.on('click', async function(){
        // Wait for weather data
        await getLatestWeatherData(station.id);
        let dataText = [" \xB0C", " \xB0C", " %", " m/s", ""];
        let data = ["air_temperature", "road_temperature", "air_humidity", "wind_speed", "wind_direction"];
        let markerDiv = document.getElementById("marker-data");
        if(markerDiv != null) {
        for(let i = 0; i < 4; i++) {
            markerDiv.rows[i + 2].cells[1].innerHTML = latestWeatherData[0][data[i]] + dataText[i];
        }
        markerDiv.rows[6].cells[1].innerHTML =  windDirection(latestWeatherData[0][data[4]]);
    }   
        

    });


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

