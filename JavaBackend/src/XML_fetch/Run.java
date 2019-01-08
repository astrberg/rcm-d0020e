package XML_fetch;

import java.lang.Thread;

public class Run {

	static FetchFiles fetch = new FetchFiles();
	static ConvertStationXML stations = new ConvertStationXML();
	static ConvertWeatherXML weather = new ConvertWeatherXML();

	static SendToMysql mysql = new SendToMysql();
	
	public static void gatherStations() {
		// get stations data from Trafikverket
		fetch.fetchStations();
		
		// convert from the .xml file to a .txt file
		stations.ConvertStation();
		stations.saveData();
		
		// create the query and send it to the db
		mysql.handleStations();

	}
	
	public static void gatherWeather() {
		// get weather data from Trafikverket
		fetch.fetchWeather();
		
		// convert from the .xml file to a .txt file
		weather.ConvertStation();
		weather.saveData();
	
		// create the query and send it to the db
		mysql.handleWeather();
	}
	
	public static void main(String[] args) {

		// gather the station data once
		gatherStations();
		
		// The time unit that the thread shall sleep
		long timeUnit = 1000*60*15;		//1000*60*15 = 15 min
		
		// create a loop to gather weather data every 15 min
		while(true) {			
			try {
				System.out.println("\nNew loop started");
				gatherWeather();
				Thread.sleep(timeUnit);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		

	}

}
