package XML_fetch;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.*;
import java.util.ArrayList;


public class SendToMysql {

	Connection myConnection = null;
	String weather = "temp_weather.txt";

	String stations = "temp_stations.txt";
	
	
	
	

	
	String dbUrl = "jdbc:mysql://localhost:3306/db";
	String username = "java";
	String password = "password";
	
	public SendToMysql() {

	}
	
	public void handleStations() {
		ArrayList<String> stationID = new ArrayList<String>();
		ArrayList<Float> stationLon = new ArrayList<Float>();
		ArrayList<Float> stationLat = new ArrayList<Float>();
		ArrayList<String> stationName = new ArrayList<String>();
		ArrayList<Integer> stationRoad = new ArrayList<Integer>();
		ArrayList<Integer> stationCounty = new ArrayList<Integer>();
		readStations(stationID, stationLon, stationLat, stationName, stationRoad, stationCounty);
	}
	
	public void handleWeather() {
		ArrayList<String> weatherID = new ArrayList<String>();
		ArrayList<String> weatherDate = new ArrayList<String>();
		ArrayList<Float> weatherAirTemp = new ArrayList<Float>();
		ArrayList<Float> weatherRoadTemp = new ArrayList<Float>();
		ArrayList<Float> weatherHumidity = new ArrayList<Float>();
		ArrayList<Float> weatherWindSpeed = new ArrayList<Float>();
		ArrayList<String> weatherWindDirection= new ArrayList<String>();
		
		readWeather(weatherID, weatherDate, weatherAirTemp, weatherRoadTemp, weatherHumidity, weatherWindSpeed, weatherWindDirection);
		
	}
	
	private void readStations(ArrayList<String> stationID, ArrayList<Float> stationLon,
							ArrayList<Float> stationLat, ArrayList<String> stationName,
							ArrayList<Integer> stationRoad, ArrayList<Integer> stationCounty) {
		try(BufferedReader br = new BufferedReader(new FileReader(stations))){
			
			String line;
			while((line = br.readLine()) != null) {
				String[] array = line.split(";");
				
				stationID.add(array[0]);
				stationLon.add(Float.parseFloat(array[1]));
				stationLat.add(Float.parseFloat(array[2]));
				stationName.add(array[3]);
				stationRoad.add(Integer.parseInt(array[4]));
				stationCounty.add(Integer.parseInt(array[5]));
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Read stations broke");
		} 
		addStationsToDb(stationID, stationLon, stationLat, stationName, stationRoad, stationCounty);

		
	}
	
	private void addStationsToDb(ArrayList<String> stationID, ArrayList<Float> stationLon,
								ArrayList<Float> stationLat, ArrayList<String> stationName,
								ArrayList<Integer> stationRoad, ArrayList<Integer> stationCounty) {
		
		System.out.println("Loading driver...");

		try {
		    Class.forName("com.mysql.jdbc.Driver");
		    //System.out.println("Driver loaded!");
		} catch (ClassNotFoundException e) {
		    throw new IllegalStateException("Cannot find the driver in the classpath!", e);
		}
		
		try {
			

			Connection myConnection = DriverManager.getConnection(dbUrl, username, password);

			for (int i = 0; i < stationID.size(); i++) {


				String query2 = "INSERT INTO station_data (id, lat, lon, name, road_number, county_number)"
						+ "VALUES (?, ?, ?, ?, ?, ?)";
				PreparedStatement prep2 = myConnection.prepareStatement(query2);
				prep2.setString(1, stationID.get(i));
				prep2.setFloat(2, stationLat.get(i));
				prep2.setFloat(3, stationLon.get(i));
				prep2.setString(4, stationName.get(i));
				prep2.setInt(5, stationRoad.get(i));
				prep2.setInt(6, stationCounty.get(i));
				prep2.executeUpdate();
				
				
				
			}
			
			stationID.clear();
			stationLat.clear();
			stationLon.clear();
			stationName.clear();
			stationRoad.clear();
			stationCounty.clear();
			System.out.println("Finished mysql");

		} catch (Exception e) {
			System.out.println(e.getMessage());
			System.out.println("MySQL broke");
		}
		
	}
	
	
	public void readWeather(ArrayList<String> weatherID, 
							ArrayList<String> weatherDate, 
							ArrayList<Float> weatherAirTemp, 
							ArrayList<Float> weatherRoadTemp, 
							ArrayList<Float> weatherHumidity, 
							ArrayList<Float> weatherWindSpeed, 
							ArrayList<String> weatherWindDirection) {
		
		try (BufferedReader br = new BufferedReader(new FileReader(weather))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] array = line.split(";");
				weatherID.add(array[0]);
				weatherDate.add(array[1]);
				
				//formatDate();
				
				weatherAirTemp.add(Float.parseFloat(array[2]));
				weatherRoadTemp.add(Float.parseFloat(array[3]));
				weatherHumidity.add(Float.parseFloat(array[4]));
				weatherWindSpeed.add(Float.parseFloat(array[5]));
				if(array.length >= 7) {
					weatherWindDirection.add(array[6]);
				}else {
					weatherWindDirection.add("null");
				}
				//
			}
			weatherDate = formatDate(weatherDate);
			br.close();
		} catch (Exception e) {
			System.out.println(e);
			System.out.println("Something went wrong...");
		}
		
		addWeatherToDb(weatherID, weatherDate, weatherAirTemp, weatherRoadTemp, weatherHumidity, weatherWindSpeed, weatherWindDirection);

	}

	public ArrayList<String> formatDate(ArrayList<String> weatherDate) {
		ArrayList<String> temp_station_date = new ArrayList<String>();
		String temp = "";
		for (int i = 0; i < weatherDate.size(); i++) {
			temp = weatherDate.get(i).substring(0, 10) + " " + weatherDate.get(i).substring(11, 17) + "00";
			temp_station_date.add(temp);
		}
		return temp_station_date;
	}

	public void addWeatherToDb(ArrayList<String> weatherID, 
								ArrayList<String> weatherDate, 
								ArrayList<Float> weatherAirTemp, 
								ArrayList<Float> weatherRoadTemp, 
								ArrayList<Float> weatherHumidity, 
								ArrayList<Float> weatherWindSpeed, 
								ArrayList<String> weatherWindDirection) {
		
		System.out.println("Loading driver...");

		try {
		    Class.forName("com.mysql.jdbc.Driver");
		    System.out.println("Driver loaded!");
		} catch (ClassNotFoundException e) {
		    throw new IllegalStateException("Cannot find the driver in the classpath!", e);
		}
		
		try {
			
			Connection myConnection = DriverManager.getConnection(dbUrl, username, password);
			
			for (int i = 0; i < weatherID.size(); i++) {
				String date = weatherDate.get(i);
				Timestamp ts = Timestamp.valueOf(date);

				
				String query2 = "INSERT INTO weather_data (station_id, "
						+ "timestamp, air_temperature, road_temperature, air_humidity,"
						+ "wind_speed, wind_direction) "
						+ "VALUES (?, ?, ?, ?, ?, ?, ?)";
				PreparedStatement prep2 = myConnection.prepareStatement(query2);
				prep2.setString(1, weatherID.get(i));
				prep2.setTimestamp(2, ts);
				prep2.setFloat(3, weatherAirTemp.get(i));
				prep2.setFloat(4, weatherRoadTemp.get(i));
				prep2.setFloat(5, weatherHumidity.get(i));
				prep2.setFloat(6, weatherWindSpeed.get(i));
				prep2.setString(7, weatherWindDirection.get(i));
				prep2.executeUpdate();
				
			}
			weatherID.clear();
			weatherAirTemp.clear();
			weatherRoadTemp.clear();
			weatherHumidity.clear();
			weatherWindSpeed.clear();
			weatherWindDirection.clear();
			System.out.println("Finished mysql");

		} catch (Exception e) {
			System.out.println(e.getMessage());
			System.out.println("MySQL broke");
		}
		
	}

}





