/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);

var averageData = [];
var markedStations = [];
var countyDrawn = 0;
var roadDrawn = 0;
var noColor = false;
/**
 * The layer for the Leaflet map
 */
var swedenRoads = 'http://{s}.tile.openstreetmap.se/osm/{z}/{x}/{y}.png';
var roadTileLayer = L.TileLayer.boundaryCanvas(swedenRoads, {
    maxZoom: 9,
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

function countyStyle(feature) {
    var avg = averageData[feature.properties.countyCode];
    return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: getColor(avg[1])
    };
}
function roadStyle(feature) {
    var avg = averageData[feature.properties.countyCode];
    return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(avg[2])
    };
}

function highlightFeature(e) {
    if(noColor == false) {
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        info.update(layer.feature.properties);
    }else {
        var layer = e.target;
        layer.setStyle({
        weight: 2,
        color: 'black',
        dashArray: '',
        fillOpacity: 0
    });
    info.update(layer.feature.properties);
    }
}

map.doubleClickZoom.disable(); 
function createPopup(e) {
    var layer = e.target;
    var countyCode = layer.feature.properties.countyCode;
    var avg = averageData[countyCode];
    var popLocation= e.latlng;
    var chosenCountyExists = false;
    var popup = L.popup();
    popup.setLatLng(popLocation);
    var button = document.createElement("div");
    var popupContent = document.createElement("table-data");
    popupContent.innerHTML  = '<table id = "county-data" >' +
    '<tr> <td> Län: </td><td>' + countyNames[avg[0]] + '</td></tr>' + 
    '<tr> <td>Lufttemperatur: </td><td>' + avg[1].toFixed(1)+ '\xB0C' + '</td></tr>' +
    '<tr> <td>Vägtemperatur: </td><td>' + avg[2].toFixed(1)+ '\xB0C' + '</td></tr>' +
    '<tr> <td>Luftfuktighet: </td><td></td></tr>' +
    '<tr> <td>Vindhastighet: </td><td></td></tr>' +
    '</table>';


    for(var i = 0; i < chosenCounties.length; i++) {
        if(chosenCounties[i] === countyCode) {
            button.innerText = "Ta bort";
            button.className = "remove-button"; 
            chosenCountyExists = true;  
        }
    }
    if(!chosenCountyExists) {
        button.className = "add-button";
        button.innerText = "Lägg till";
    }
    
    
    button.addEventListener("click" , function() {
        if(chosenCountyExists == true) {
            removeCounty(countyCode, button); 
            map.closePopup();     
        }else {
            addChosenCounty(countyCode, popLocation, button);
            map.closePopup();
        }
   });

    popupContent.appendChild(button);
    popup.setContent(popupContent);
    popup.openOn(map);

}

function resetHighlight(e) {
    if(noColor == false) {
        info.update();
        geojson.resetStyle(e.target);

    }else {
        info.update();
        }
    }

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: createPopup
    });
}


//Adds the Swedish countys to the map with some css styling
function drawMap() {
 
    if(roadDrawn == 1) {
        map.removeLayer(roadTileLayer);
        map.removeLayer(geojson);
        roadDrawn = 0;
    }
    if(countyDrawn == 0) {
        standardTileLayer.addTo(map);
        geojson = L.geoJson(countyData, {
            style: countyStyle,
            onEachFeature: onEachFeature
        }).addTo(map);
        countyDrawn = 1;
    }
}

function drawRoads(){
    if(countyDrawn == 1) {
        map.removeLayer(geojson);
        map.removeLayer(standardTileLayer);
        countyDrawn = 0;

    }
    if(roadDrawn == 0) {
        roadTileLayer.addTo(map);
        geojson = L.geoJson(countyData, {
            style: roadStyle,
            onEachFeature: onEachFeature
        }).addTo(map);
        roadDrawn = 1;

    }
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



var stateChangingButton = L.easyButton({
    states: [{
            stateName: 'Ta-bort-färgmarkering',        
            icon:      'fas fa-toggle-off',               
            title:     'Ta bort färmarkering',      
            onClick: function(btn, map) {      
                btn.state('Lägg-till-färgmarkering');    
                geojson.eachLayer(function (layer) {    
                     layer.setStyle({fillOpacity :0 }) 
                     noColor = true;
                });
            }
        }, {
            stateName: 'Lägg-till-färgmarkering',
            icon:      'fas fa-toggle-on',
            title:     'Lägg till färgmarkering',
            onClick: function(btn, map) {
                btn.state('Ta-bort-färgmarkering');
                geojson.eachLayer(function (layer) {    
                    layer.setStyle({fillOpacity : 0.7 }) 
                    noColor = false;
               });
            }
    }]
});

var mapChangingButton = L.easyButton({
    states: [{
            stateName: 'Countymap',        
            icon:      'fas fa-sun',               
            title:     'Länöversikt lufttemperatur',      
            onClick: function(btn, map) { 
                btn.state('Roadmap');
                stateChangingButton.state('Ta-bort-färgmarkering');
                noColor = false;     
                drawMap();
            }
        }, {
            stateName: 'Roadmap',
            icon:      'fas fa-road',
            title:     'Länöversikt vägtemperatur',
            onClick: function(btn, map) {
                btn.state('Countymap');
                stateChangingButton.state('Ta-bort-färgmarkering');
                noColor = false;
                drawRoads();
            }
    }]
});

mapChangingButton.addTo(map);
stateChangingButton.addTo(map);
