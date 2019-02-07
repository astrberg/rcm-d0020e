
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



$("#suggestion-field").on("click", ".suggestion-box", function(){
    // get the index saved as id
    index = $(this).attr("id");

    zoomToStation(index);
});

function getSuggestionBox(name, index){
    let suggestionBox = `<div class="suggestion-box" id="${index}"> 
                            <div>${name}</div>
                        </div>`;
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
        
        suggestionField.append(getSuggestionBox(foundStations[i][0].name, foundStations[i][1]));
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

