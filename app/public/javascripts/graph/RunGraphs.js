/**
 * This function wil clear the arrays in graph.js.
 * It will then call the functions in GetWeatherData.js to get the data from API.
 * The data will be generated and after this is done we call the functions that will draw the graphs.
 * Which graphs will be generated depends on what is chosen in map-module
 * @param {*} starttime Start time to know which intervall to get data from
 * @param {*} stoptime Stop time to know which intervall to get data from
 */
async function rungraphs(starttime, stoptime){
	var a = new Date(starttime.substring(0,10)+"T"+starttime.substring(11,)+"Z");
	var b = new Date(stoptime.substring(0,10)+"T"+stoptime.substring(11,)+"Z");
	if(+a < +b){
	//arrayclear
	await cleararrays();
	
	//canvasclear
	const canvasclearvar1 = document.getElementById('myChart1').getContext('2d');
        canvasclearvar1.clearRect(0,0, document.getElementById('myChart1').width, document.getElementById('myChart1').height);

	const canvasclearvar2 = document.getElementById('myChart2').getContext('2d');
        canvasclearvar2.clearRect(0,0, document.getElementById('myChart2').width, document.getElementById('myChart2').height);

	const canvasclearvar3 = document.getElementById('myChart3').getContext('2d');
        canvasclearvar3.clearRect(0,0, document.getElementById('myChart3').width, document.getElementById('myChart3').height);

	const canvasclearvar4 = document.getElementById('myChart4').getContext('2d');
        canvasclearvar4.clearRect(0,0, document.getElementById('myChart4').width, document.getElementById('myChart4').height);

	const canvasclearvar5 = document.getElementById('myChart5').getContext('2d');
        canvasclearvar5.clearRect(0,0, document.getElementById('myChart5').width, document.getElementById('myChart5').height);

	const canvasclearvar6 = document.getElementById('myChart6').getContext('2d');
		    canvasclearvar6.clearRect(0,0, document.getElementById('myChart6').width, document.getElementById('myChart6').height);

	const canvasclearvar7 = document.getElementById('myChart7').getContext('2d');
		    canvasclearvar7.clearRect(0,0, document.getElementById('myChart7').width, document.getElementById('myChart7').height);

	const canvasclearvar8 = document.getElementById('myChart8').getContext('2d');
		    canvasclearvar8.clearRect(0,0, document.getElementById('myChart8').width, document.getElementById('myChart8').height);

	const canvasclearvar9 = document.getElementById('myChart9').getContext('2d');
		    canvasclearvar9.clearRect(0,0, document.getElementById('myChart9').width, document.getElementById('myChart9').height);

	const canvasclearvar10 = document.getElementById('myChart10').getContext('2d');
		    canvasclearvar10.clearRect(0,0, document.getElementById('myChart10').width, document.getElementById('myChart10').height);
    
  const canvasclearvar11 = document.getElementById('myChart11').getContext('2d');
        canvasclearvar11.clearRect(0,0, document.getElementById('myChart11').width, document.getElementById('myChart11').height)

  const canvasclearvar12 = document.getElementById('myChart12').getContext('2d');
        canvasclearvar12.clearRect(0,0, document.getElementById('myChart12').width, document.getElementById('myChart12').height)
    //functioncalls to get data
    
    if(stationsarrayid.length>0){
      await getWeatherData(stationsarrayid,starttime,stoptime,stationname);
      await getlatest(stationsarrayid,stationname);
    }
    if(chosenintcounties.length>0){
      await getAverageTempProvince(chosenintcounties,starttime,stoptime);
      await getLatestAvgCountyWeatherData(chosenCounties);
    }

    if(stationsarrayid.length>0){
      //functions to draw graphs
      await roadtemp();

      await airtemp();

      await humiditygraph();

      await windspeed();

      await currenttempgraph();

      await currentroadtempgraph();

      await currenthumgraph();

      await currentwindspeedgraph();

      await daggpunktfunc();
      await currentdaggpunktfunc();
      show1("hidebut");
    }

  if(chosenintcounties.length>0){
    await roadtempprov()

    await currentairtempgraphprov();

    await currentroadtempgraphprov();
    show1("province");
  }
}
}