/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);
var chosenStations = [];
/**
 * The layer for the Leaflet map
 */
var standardTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    minZoom: 5,
    maxBoundsViscosity: 1.0,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
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

/**
 * Adds a station marker to the map
 */
function addStationToMap(station){
    var marker = L.marker([station.lat, station.long]).addTo(map);
    marker.bindPopup('<div id = "popupid:' + station.id + '" class="popup" >' + 
    'Station: ' + station.name + '<br>' +
    'Lufttemperatur: ' + station.airTemp + '<br>' +
    'Vägtemperatur: ' + station.roadTemp + '<br>' +
    'Luftfuktighet: ' + station.humidity + '<br>' +
    'Vind: ' + station.windSpeed + '<br>' +
    'Vindriktning: ' + station.windDirection + '<br>' +
    '<div class="center"><button id="buttonid:' + station.id +'" onclick="addChosenStation('+station.id+')" class="button" >Lägg till</button></div>');
}

function addChosenStation(station_id){
    if(!chosenStations.includes(station_id)){
        chosenStations.push(station_id);
        console.log("Added station: " + station_id + " to chosenStations.");
    }else{
        console.log("Station is already chosen");
    }
    
}

