/**
 * Options.js contains the javascript and jquery to operate everything inside the <div id="options">..</div> inside graph.ejs
 * Which includes the time/date input
 * Hide/show elements
 */

//Press the checkboxes to show or hide the graphs/buttons
$(function () {
        $("#airtemp").click(function () {
            if ($(this).is(":checked")) {
                $("#type1").show();
              
            } else {
                $("#type1").hide();
                
            }
        });
    $("#Road_temp").click(function () {
            if ($(this).is(":checked")) {
                $("#type2").show();
              
            } else {
                $("#type2").hide();
                
            }
        });
    $("#Air_humidity").click(function () {
            if ($(this).is(":checked")) {
                $("#type3").show();
              
            } else {
                $("#type3").hide();
                
            }
        });
    $("#Wind_speed").click(function () {
            if ($(this).is(":checked")) {
                $("#type4").show();
              
            } else {
                $("#type4").hide();
                
            }
        });
    $("#current_temp").click(function () {
            if ($(this).is(":checked")) {
                $("#type5").show();
              
            } else {
                $("#type5").hide();
                
            }
        });
    $("#current_road_temp").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type6").show();
		      
		    } else {
		        $("#type6").hide();
		        
		    }
		});
    $("#current_hum").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type7").show();
		      
		    } else {
		        $("#type7").hide();
		        
		    }
	});
   $("#current_windspeed").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type8").show();
		      
		    } else {
		        $("#type8").hide();
		        
		    }
	});
   $("#current_temp_prov").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type9").show();
		      
		    } else {
		        $("#type9").hide();
		        
		    }
	});
   $("#current_road_prov").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type10").show();
		      
		    } else {
		        $("#type10").hide();
		        
		    }
  });
  $("#overtime_road_prov").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type11").show();
		      
		    } else {
		        $("#type11").hide();
		        
		    }
  });
  $("#daggpunkt").click(function () {
		    if ($(this).is(":checked")) {
		        $("#type12").show();
		      
		    } else {
		        $("#type12").hide();
		        
		    }
  });
 });
//hide elements functions
function hide1(classvar){
  var appBanners = document.getElementsByClassName(classvar), i;
for (var i = 0; i < appBanners.length; i ++) {
    appBanners[i].style.display = 'none';
}
}

function show1(classvar){
  var appBanners = document.getElementsByClassName(classvar), i;
for (var i = 0; i < appBanners.length; i ++) {
    appBanners[i].style.display = 'block';
}
}

function hidebyid(id){
  var x = document.getElementById(id);
  x.style.display = "none";
}

function hideelements(id,box){
  var x = document.getElementById(id);
  x.style.display = "none";
  document.getElementById(box).checked = false;
}

document.querySelectorAll('input[type=number]')
  .forEach(e => e.oninput = () => {
    // Always 2 digits
    if (e.value.length >= 2) e.value = e.value.slice(0, 2);
    // 0 on the left (doesn't work on FF)
    if (e.value.length === 1) e.value = '0' + e.value;
    // Avoiding letters on FF
    if (!e.value) e.value = '00';
  });

//Slider1 for starttime
var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("output1");
output1.innerHTML = '2019-01-20 13:12:12'; 


slider1.oninput = function() {
	parseour1();
} 


//dateformat input1 - calender
var dateinput1 = document.getElementById("timeintervallpick1");
dateinput1.oninput = function() {
	var date = new Date(this.value)
	date.setHours(parseInt(document.getElementById('timeinput241').value)+1,parseInt(document.getElementById('timeinput242').value));
	document.getElementById("myRange1").value=date.getTime()/1000;
	parseour1();
}

//timeformat input1
var timeformat1 = document.getElementById("timeinput241");
timeformat1.oninput = function() {
	var date = new Date(document.getElementById("timeintervallpick1").value)
	console.log(this.value)
	date.setHours(parseInt(this.value),parseInt(document.getElementById('timeinput242').value));
	document.getElementById("myRange1").value=date.getTime()/1000;
	parseour1();
}

//timeformat input2
var timeformat2 = document.getElementById("timeinput242");
timeformat2.oninput = function() {
	var date = new Date(document.getElementById("timeintervallpick1").value)
	date.setHours(parseInt(document.getElementById('timeinput241').value),parseInt(this.value));
	document.getElementById("myRange1").value=date.getTime()/1000;
	parseour1();
}



//Slider2 for stoptime
var slider = document.getElementById("myRange2");
var output = document.getElementById("output2");
output.innerHTML = '2019-01-30 13:23:20'; 

slider.oninput = function() {
	parseour();
} 

//dateformat input2 - calender
var dateinput2 = document.getElementById("timeintervallpick2");
dateinput2.oninput = function() {
	var date = new Date(this.value)
	date.setHours(parseInt(document.getElementById('timeinput243').value),parseInt(document.getElementById('timeinput244').value));
	document.getElementById("myRange2").value=date.getTime()/1000;
	parseour();
}

//timeformat input3
var timeformat3 = document.getElementById("timeinput243");
timeformat3.oninput = function() {
	var date = new Date(document.getElementById("timeintervallpick2").value)
	console.log(this.value)
	date.setHours(parseInt(this.value),parseInt(document.getElementById('timeinput244').value));
	document.getElementById("myRange2").value=date.getTime()/1000;
	parseour();
}

//timeformat input4
var timeformat4 = document.getElementById("timeinput244");
timeformat4.oninput = function() {
	var date = new Date(document.getElementById("timeintervallpick2").value)
	date.setHours(parseInt(document.getElementById('timeinput243').value),parseInt(this.value));
	document.getElementById("myRange2").value=date.getTime()/1000;
	parseour();
}
/**
 * This function will set the stoptime after using the calender or sliders
 */
function parseour(){
var d2 = new Date(0);
  d2.setUTCSeconds(slider.value);
 if(d2.getMonth()<=9 && d2.getDate()>=9){
  stoptime = d2.getFullYear()+"-"+0+(parseInt(d2.getMonth())+1).toString()+"-"+d2.getDate()+" "+d2.getHours()+":"+d2.getMinutes()+":"+d2.getSeconds();
}

if(d2.getDate()<=9 && d2.getMonth()>=9){
  stoptime = d2.getFullYear()+"-"+(parseInt(d2.getMonth())+1).toString()+"-"+0+d2.getDate()+" "+d2.getHours()+":"+d2.getMinutes()+":"+d2.getSeconds();
}

if(d2.getDate()<=9 && d2.getMonth()<=9){
  stoptime = d2.getFullYear()+"-"+0+(parseInt(d2.getMonth())+1).toString()+"-"+0+d2.getDate()+" "+d2.getHours()+":"+d2.getMinutes()+":"+d2.getSeconds();
}
if (d2.getDate()>=9 && d2.getMonth()>=9){
stoptime = d2.getFullYear()+"-"+(parseInt(d2.getMonth())+1).toString()+"-"+d2.getDate()+" "+d2.getHours()+":"+d2.getMinutes()+":"+d2.getSeconds();}
output.innerHTML = stoptime;
document.getElementById('timeintervallpick2').value =stoptime.slice(0,10);
document.getElementById('timeinput243').value =d2.getHours();
document.getElementById('timeinput244').value =d2.getMinutes();

}
/**
 * This function will set the starttime after using the calender or sliders
 */
function parseour1(){
var d1 = new Date(0);
 d1.setUTCSeconds(slider1.value);
 if(d1.getMonth()<=9 && d1.getDate()>=9){
  starttime = d1.getFullYear()+"-"+0+(parseInt(d1.getMonth())+1).toString()+"-"+d1.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
}

if(d1.getDate()<=9 && d1.getMonth()>=9){
  starttime = d1.getFullYear()+"-"+(parseInt(d1.getMonth())+1).toString()+"-"+0+d1.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
}

if(d1.getDate()<=9 && d1.getMonth()<=9){
  starttime = d1.getFullYear()+"-"+0+(parseInt(d1.getMonth())+1).toString()+"-"+0+d1.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
}
if (d1.getDate()>=9 && d1.getMonth()>=9){
starttime = d1.getFullYear()+"-"+(parseInt(d1.getMonth())+1).toString()+"-"+d1.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
}
output1.innerHTML = starttime;
document.getElementById('timeintervallpick1').value =starttime.slice(0,10);
document.getElementById('timeinput241').value =d1.getHours();
document.getElementById('timeinput242').value =d1.getMinutes();

}

//function to see when we scroll and show go top top button
window.onscroll = function(){scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop > 250 || document.documentElement.scrollTop > 250){
        document.getElementById("jumtotop").style.display="block"
    }else{
        document.getElementById("jumtotop").style.display="none"
    }
}
