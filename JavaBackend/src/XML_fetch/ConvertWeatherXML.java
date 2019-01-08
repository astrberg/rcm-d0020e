package XML_fetch;

import java.util.ArrayList;

import org.w3c.dom.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.*;
import java.io.*;

public class ConvertWeatherXML {

	String weatherXML = "weather_cache.xml";

	// All of the ArrayLists needed
	ArrayList<String> stations = new ArrayList<String>();
	ArrayList<String> dates = new ArrayList<String>();
	
	ArrayList<Float> airTemperature = new ArrayList<Float>();
	ArrayList<Float> roadTemperature = new ArrayList<Float>();
	
	ArrayList<Float> humidities = new ArrayList<Float>();
	
	ArrayList<Float> windSpeed = new ArrayList<Float>();
	ArrayList<String> windDirection = new ArrayList<String>();
	

	public String getChild(Node list,int index){
		return list.getChildNodes().item(index).getChildNodes().item(0).getChildNodes()
								.item(0).getChildNodes().item(0).getChildNodes().item(0).getChildNodes().item(0)
								.getTextContent();
	}

	public void ConvertStation() {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

		try {
			// Used to store XML instances
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(weatherXML);

			// Start parsing from the most convenient place in the XML-document
			NodeList weatherList = doc.getElementsByTagName("siteMeasurements");

			// Temporary storage variables
			String id = "";
			String date = "";
			float airtemp = 0;
			float roadtemp = 0;
			float humid = 0;
			float windSp = 0;
			String windDir = "";

			int skippedStations = 0;

			for (int i = 0; i < weatherList.getLength(); i++) {

				Node list = weatherList.item(i);

				if (list.getNodeType() == Node.ELEMENT_NODE) {

					// Get information from the XML file, parse it to wanted datatype
					try {
						id = list.getChildNodes().item(0).getAttributes().getNamedItem("id").getTextContent();
						date = list.getChildNodes().item(1).getTextContent();
						airtemp = Float.parseFloat(getChild(list,4));
						roadtemp = Float.parseFloat(getChild(list, 5));
						humid = Float.parseFloat(getChild(list,9));
						windSp = Float.parseFloat(getChild(list,2));
						windDir = getChild(list,3);
						
						
						stations.add(id);
						dates.add(date);
						airTemperature.add(airtemp);
						roadTemperature.add(roadtemp);
						humidities.add(humid);
						windSpeed.add(windSp);
						windDirection.add(windDir);
						
					} catch (Exception e) {
						// If an exception is found
						skippedStations++;
					}
					
				}
			}
			System.out.println("Stations skipped due to parsing problems: " + Integer.toString(skippedStations));
			System.out.println("Probably problem with the Datex II XML file");

		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void printData() {
		// Simple loop to output data to console
		for (int i = 0; i < stations.size(); i++) {
			System.out.println("StationID: " + stations.get(i) + " Date: " + dates.get(i) + " Air: "
					+ airTemperature.get(i) + " Road: " + roadTemperature.get(i) + " Humidity: " + humidities.get(i));
		}
		
		
	}

	public void saveData() {
		// A simple try/catch method of writing to a file
		
		try (PrintWriter out = new PrintWriter("temp_weather.txt")) {
			out.flush();
			
			for (int i = 0; i < stations.size(); i++) {
				out.println(stations.get(i) + ";" + dates.get(i) + ";" + airTemperature.get(i) + ";"
						+ roadTemperature.get(i) + ";" + humidities.get(i) + ";" + windSpeed.get(i) + ";" + windDirection.get(i));
			}
			
			stations.clear();
			dates.clear();
			airTemperature.clear();
			roadTemperature.clear();
			humidities.clear();
			windSpeed.clear();
			windDirection.clear();
			out.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
