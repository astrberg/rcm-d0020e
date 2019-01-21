var mysql = require('mysql');


var connection = mysql.createConnection({
    host: '130.240.204.191',
    user: 'java',
    port: '3306',
    password: 'password',
    database: 'db',
})

console.log("db");

/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    testConnection : function(req, res, next){
        console.log("Database");
        connection.connect(function(err){
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("Connected");
            res.sendStatus(418);
        });
        
    },
};