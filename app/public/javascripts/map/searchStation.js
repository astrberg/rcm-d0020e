
// remove suggestion-field when clicking outside
$("body").mousedown(function(e){

    var suggestionField = $("#suggestion-field");

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



// $("#suggestion-field").on("click", ".suggestion-box", function(){
//     // get the index saved as id
//     index = $(this).attr("id");

//     zoomToStation(stationsData[index]);
// });

function getSuggestionBox(station, index){
    let suggestionBox = document.createElement('div');
    suggestionBox.className = "suggestion-box";
    suggestionBox.id = index;
    let name = document.createElement('div');
    name.innerHTML = station.name;
    name.style = 'text-align: center; font-size: 2em;';
    suggestionBox.appendChild(name);
    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.style = " width: 45%; margin-right: 5%;";
    addButton.innerHTML = "Lägg till";
    addButton.addEventListener('click',function(){
        for(var i = 0; i < layerGroups.length; i++) {
            let layer_group = layerGroups[i]; 
            layer_group.eachLayer(function(layer_elem){
                if(layer_elem instanceof L.Marker){
                    const id = "marker"+station.id;
                    if(layer_elem.options.myCustomId == id){
                        console.log("YEEESS!!!");
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
    // let suggestionBox = `<div class="suggestion-box" id="${index}"> 
    //                         <div>${name}</div>
    //                         <button></button>
    //                     </div>`;
    return suggestionBox;
} 

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


function searchStation(name){

    let foundStations = [];

    // create regex
    var regex = new RegExp(name.toUpperCase());
    
    for(let i = 0; i < stationsData.length; i++){
        
        // execute regex, if string is found in name, add the station and the index 
        // of the station to the found stations
        if(regex.exec(stationsData[i].name.toUpperCase())){
            foundStations.push([stationsData[i], i]);
        }
    }

    return foundStations;
}

