const mysqlssh = require('mysql-ssh');
const authorization = require('./authorization');


/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    getAverageTempProvince : function(req, res, next, county_number){
       
        let auth = new authorization.Authorization();


        // get current time
        let stop_time = new Date();
        let start_time = new Date();


        stop_time.setHours(stop_time.getHours() - stop_time.getTimezoneOffset() / 60);
        start_time.setHours(start_time.getHours() - start_time.getTimezoneOffset() / 60);


        // new data is gathered every 15 min, to get the last inserted data we need to check
        // between time now and time-15min
        start_time.setMinutes(start_time.getMinutes() - 15);


        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // select avg temps from stations in county over the last 15 min
            var sql = "SELECT AVG(air_temperature), AVG(road_temperature) FROM weather_data WHERE station_id "+ 
                        "IN (SELECT id FROM station_data WHERE county_number = ?) " + 
                        "AND timestamp BETWEEN ? AND ?";
            
                        
            var values =  [county_number, start_time.toISOString(), stop_time.toISOString()];

            client.query(sql, values, function (err, results) {
                if (err) throw err
                
                mysqlssh.close()

                // send data back to client
                res.send(results);
            });

        }).catch(err => {
            console.log(err)
        }) 
    }
};