var express = require('express');
var router = express.Router();

var test = require('../database/testConnection');
var station = require('../database/getStationData');
var weather = require('../database/getWeatherData');
var province = require('../database/getProvinceData');


/* GET test connection */
router.get('/testDbConnection', function(req, res, next) {
  
    test.testConnection(req,res,next);
});

/* GET station data */
router.get('/getStationData', function(req, res, next) {
  
    station.getStationData(req,res,next);
});

/* GET AVG temp over province */
router.get('/getAverageTempProvince', function(req, res, next) {
    
    province_id = req["query"]["province_id"];

    province.getAverageTempProvince(req,res,next,province_id);
});

/* GET weather data */
router.get('/getLatestWeatherData', function(req, res, next) {
    
    station_id = req["query"]["station_id"];
    
    weather.getLatestWeatherData(req,res,next,station_id);
});

/* GET weather data over time */
router.get('/getWeatherData', function(req, res, next) {
    
    station_id = req["query"]["station_id"];
    start_time = req["query"]["start_time"];
    stop_time = req["query"]["stop_time"];

    weather.getWeatherData(req,res,next,station_id, start_time, stop_time);
});

/* GET weather data over time */
router.get('/getAverageWeatherData', function(req, res, next) {
    
    station_id = req["query"]["station_id"];
    start_time = req["query"]["start_time"];
    stop_time = req["query"]["stop_time"];
    
    weather.getAverageWeatherData(req,res,next,station_id, start_time, stop_time);
});

module.exports = router;
