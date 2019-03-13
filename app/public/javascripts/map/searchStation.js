
// remove suggestion-field when clicking outside
$("body").mousedown(function(e){

    let suggestionField = $("#suggestion-field");

    // if the target of the click isn't the suggestionField nor a descendant of the suggestionField
    if (!suggestionField.is(e.target) && suggestionField.has(e.target).length === 0) 
    {
        suggestionField.empty();
        suggestionField.hide();
    }
    
})

$("#searchbar").keyup(function(){
    searchbarHandler();
}).mouseup(function(){
    searchbarHandler();
});


// lock and unlock map dragging when hovering over suggestion-field
$("#suggestion-field").mouseenter( function(){
    map.dragging.disable();
}).mouseleave(function(){
    map.dragging.enable();
});

/**
 * Creates and returns a suggestion box of a specific station.
 * @param {*} station a station data JSON object.
 * @param {*} index the index of station in stationData array
 */
function getSuggestionBox(station, index){
    let suggestionBox = document.createElement('div');
    suggestionBox.className = "suggestion-box";
    suggestionBox.id = index;

    let name = document.createElement('div');
    name.innerHTML = station.name;
    name.style = 'text-align: center; font-size: 2em;';
    suggestionBox.appendChild(name);

    const addButton = document.createElement('button');
    addButton.style = " width: 45%; margin-right: 5%;";
    
    if(chosenStations.includes(station)){
        addButton.className = 'remove-button';
        addButton.innerHTML = "Ta bort";
    }else{
        addButton.className = 'add-button';
        addButton.innerHTML = "Lägg till";
    }
    
    addButton.addEventListener('click',function(){
        for(let i = 0; i < layerGroups.length; i++) {
            let layer_group = layerGroups[i]; 
            layer_group.eachLayer(function(layer_elem){
                if(layer_elem instanceof L.Marker){
                    const id = "marker"+station.id;
                    if(layer_elem.options.myCustomId == id){
                        handleChosenStations(station, layer_elem, addButton);
                    }
                }
            });
        }
    });
    suggestionBox.appendChild(addButton);

    const zoomButton = document.createElement('button');
    zoomButton.className = 'button';
    zoomButton.style = "width: 45%;";
    zoomButton.innerHTML = "Gå till station";
    zoomButton.addEventListener('click',function(){
        zoomToStation(stationsData[index]);
    });
    suggestionBox.appendChild(zoomButton);

    return suggestionBox;
} 

/**
 * Adds suggested stations in the search list
 */
function searchbarHandler(){
    
    let name = $("#searchbar").val();
    
    foundStations = searchStation(name);
    
    let suggestionField = $("#suggestion-field");

    suggestionField.empty();
    suggestionField.show();

    // append the suggestionfield with the station name and the index in the stationData list
    for(var i = 0; i < foundStations.length; i++){
        
        suggestionField.append(getSuggestionBox(foundStations[i][0], foundStations[i][1]));
    }
}

/**
 * Returns stations based on the user input text.
 * @param {*} name input text from the user
 */
function searchStation(name){

    let foundStations = [];

    // create regex
    let regex = new RegExp(name.toUpperCase());
    
    for(let i = 0; i < stationsData.length; i++){
        
        // execute regex, if string is found in name, add the station and the index 
        // of the station to the found stations
        if(regex.exec(stationsData[i].name.toUpperCase())){
            foundStations.push([stationsData[i], i]);
        }
    }

    return foundStations;
}

