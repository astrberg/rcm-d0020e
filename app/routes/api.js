var express = require('express');
var router = express.Router();
var async = require("async");

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
    
    province.getAverageTempProvince(req,res,next);
});

/* GET weather data */
router.get('/getLatestWeatherData', function(req, res, next) {
    
    station_id = req["query"]["station_id"];
    //station_id = ["SE_STA_VVIS2429", "SE_STA_VVIS2529"];
    weather.getLatestWeatherData(req,res,next,station_id);
});

/* GET weather data */
router.get('/getAllLatestWeatherData',  function(req, res, next) {
    weather.getAllLatestWeatherData(req,res,next, req.query.length);
});

/* GET weather data over time */
router.get('/getWeatherData', function(req, res, next) {
    
    station_id = req["query"]["station_id"];
    start_time = req["query"]["start_time"];
    stop_time = req["query"]["stop_time"];

    // station_id = ["SE_STA_VVIS2429", "SE_STA_VVIS2529"];
    // start_time = "2019-02-19 10:40:00"
    // stop_time = "2019-02-19 11:10:00"

  
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
