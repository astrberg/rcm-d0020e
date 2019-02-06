

$("#searchbar").keyup(function(){
    searchbarHandler();
});

function getSuggestionBox(name){
    let suggestionBox = `<div class="suggestion-box"> ${name} </div>`;
    return suggestionBox;
} 

function searchbarHandler(){
    
    let name = $("#searchbar").val();
    
    foundStations = searchStation(name);
    
    let suggestionField = $("#suggestion-field");

    suggestionField.empty();

    for(var i = 0; i < foundStations.length; i++){
        if(i >= 10){
            //break;
        }
        suggestionField.append(getSuggestionBox(foundStations[i].name));
    }


    console.log(foundStations.length);
}


function searchStation(name){

    let foundStations = [];

    // create regex
    var regex = new RegExp(name.toUpperCase());
    
    console.log(regex);

    for(let i = 0; i < stationsData.length; i++){
        
        // execute regex, if string is found in name, add the station to the found stations
        if(regex.exec(stationsData[i].name.toUpperCase())){
            foundStations.push(stationsData[i]);
        }
    }

    return foundStations;
}

