var express = require('express');
var router = express.Router();

var test = require('../database/testConnection');
var station = require('../database/getStationData');


/* GET test connection */
router.get('/testDbConnection', function(req, res, next) {
  
    test.testConnection(req,res,next);
});

/* GET station data */
router.get('/getStationData', function(req, res, next) {
  
    station.getStationData(req,res,next);
});

module.exports = router;
