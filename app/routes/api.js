var express = require('express');
var router = express.Router();

var db = require('../database/testConnection');

/* GET home page. */
router.get('/testDbConnection', function(req, res, next) {
  
    console.log("api");
    db.testConnection(req,res,next);
});



module.exports = router;
