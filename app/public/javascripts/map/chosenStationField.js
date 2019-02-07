

function displayStationField(){
    var div = $("#stationList-container")

    if (div.is(":hidden")) {
        div.show();
    } else {
        
        div.hide();
    }
}


// index is the stations index in the list of chosen stations
function addStationBox(button){
    // var stationDiv = `<div class="stationBox stationBox${index}"> 
    //                     <div class="stationBox-container">
    //                         <h3> Station name: '${name}'</h3> 
    //                         <button class="removeStation" onclick="removeStation(${index})" >Remove</button>
    //                     </div>
    //                   </div>`;
    var stationBox = document.createElement("div");
    stationBox.className = "stationBox-container";
    button.className = "remove-button";
    stationBox.appendChild(button); 
    document.getElementById("stBox").appendChild(stationBox);

}

// function appendStationToField(index){
//     let container = $("#stationList-container");
    
//     container.append(getStationBox(index, chosenStations[index].name));
// }

function showStationFieldButton(){
    $("#stationList-button").show();
    
}

function hideStationButton(){
    $("#stationList-button").hide();
    $("#stationList-container:visible").hide()
}