const mysqlssh = require('mysql-ssh');
const authorization = require('./authorization');
var async = require("async");

let mutex = 0;

/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

    // get latest inserted weather from given station
    getLatestWeatherData : function(req, res, next, station_id){
        mutex++;

        let auth = new authorization.Authorization();
        let weather_data = [];
        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            const sql = "SELECT * FROM weather_data WHERE station_id = ? ORDER BY id DESC LIMIT 1";

            // do a async loop through the station_id list
            async.each(station_id, function(id, callback){

                // get latest row of station weather data
                const values =  [[id]];

                client.query(sql, [values], function (err, results) {
                    if (err) throw err
                    
                    
                    let current_time = results[0].timestamp;

                    // convert fetched timestamp to correct timezone. 
                    // JSON parses timestamp to UTC+0 and we live in UTC+1
                    current_time.setHours(current_time.getHours() - current_time.getTimezoneOffset() / 60);
                    
                    
                    
                    weather_data.push(results);
                    callback();
                    
                })
            },function(callback){
                // when async functions are done send data back
                res.send(weather_data);
                mutex--;
        
                if(mutex == 0){
                    mysqlssh.close()

                }
            });
        }).catch(err => {
            console.log(err)
        })
        
    },
    // get weather data from given station
    getWeatherData : function(req, res, next, station_id, start_time, stop_time){
       
        mutex++;

        let auth = new authorization.Authorization();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            
            // get weather data between to given timestamps
            var sql = "SELECT * FROM weather_data WHERE station_id = ? AND timestamp BETWEEN ? AND ?";
            
            let weather_data = [];


            // do a async loop through the station_id list
            async.each(station_id, function(id, callback){

                var values =  [id,start_time, stop_time];

                client.query(sql, values, function (err, results) {
                    if (err) throw err
    
                    // convert fetched timestamp to correct timezone. 
                    // JSON parses timestamp to UTC+0 and we live in UTC+1
                    results.forEach (result =>{
    
                        let current_time = result.timestamp;
    
                        current_time.setHours(current_time.getHours() - current_time.getTimezoneOffset() / 60);
                    });
    
                    
                    // add the data of the station to the list 
                    weather_data.push(results);

                    // callback to make the async stuff work
                    callback();
                    
                })

                
            },function(callback){
                // when async functions are done send data back
                res.send(weather_data);
                mutex--;
        
                if(mutex == 0){
                    mysqlssh.close()

                }
            });
            

        }).catch(err => {
            console.log(err)
        })    
    },
    // get avarage weather data from given station
    getAverageWeatherData : function(req, res, next, station_id, start_time, stop_time){
        
        mutex++;

        let auth = new authorization.Authorization();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            
            // get weather data between to given timestamps
            var sql = "SELECT AVG(road_temperature),AVG(air_temperature), AVG(air_humidity), AVG(wind_speed) \
                       FROM weather_data WHERE station_id = ? AND timestamp BETWEEN ? AND ?";
            var values =  [station_id,start_time, stop_time];
            
            client.query(sql, values, function (err, results) {
                if (err) throw err

                mutex--;

                if(mutex == 0){
                    mysqlssh.close()

                }
                
                // send data back to client
                res.send(results);
            })

        }).catch(err => {
            console.log(err)
        })    
    }
};