var express = require('express');
var router = express.Router();

var test = require('../database/testConnection');
var station = require('../database/getStationData');
var weather = require('../database/getWeatherData');


/* GET test connection */
router.get('/testDbConnection', function(req, res, next) {
  
    test.testConnection(req,res,next);
});

/* GET station data */
router.get('/getStationData', function(req, res, next) {
  
    station.getStationData(req,res,next);
});

/* GET weather data */
router.get('/getLatestWeatherData', function(req, res, next) {
    //station_id = 'SE_STA_VVIS2240';
    weather.getLatestWeatherData(req,res,next,station_id);
});

/* GET weather data over time */
router.get('/getWeatherData', function(req, res, next) {
    // station_id = 'SE_STA_VVIS2240';
    // start_time = '2019-01-20 13:12:12';
    // stop_time = '2019-01-23 13:23:20';
    weather.getWeatherData(req,res,next,station_id, start_time, stop_time);
});

/* GET weather data over time */
router.get('/getAverageWeatherData', function(req, res, next) {
    //station_id = 'SE_STA_VVIS2240';
    //start_time = '2019-01-20 13:12:12';
    //stop_time = '2019-01-23 13:23:20';
    weather.getAverageWeatherData(req,res,next,station_id, start_time, stop_time);
});

module.exports = router;
