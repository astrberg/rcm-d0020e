const mysqlssh = require('mysql-ssh');
const authorization = require('./authorization');

let mutex = 0;
/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    getAverageTempProvince : function(req, res, next){
       
        let auth = authorization.Authorization;

        auth.increaseMutex();
        
        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // select avg temps from stations in county over the last 15 min
            var sql =  "SELECT * FROM (\
                            SELECT * FROM (\
                                SELECT w.id, w.air_temperature, w.road_temperature, s.county_number FROM weather_data w, station_data s \
                                WHERE w.station_id = s.id) \
                            AS g ORDER BY g.id DESC LIMIT 576) \
                        AS t ORDER BY t.county_number ASC";
                    
            client.query(sql, function (err, results) {
                if (err) throw err
                
                
                
                let temperatures = [];
                
                // smalest county number is 2
                var county = 0;

                // highest county number is 25, loop up to that
                while(county < 26){
                    let temporary_air_temp= 0;
                    let temporary_road_temp= 0;

                    let stations_per_county = 0;

                    // loop through the given values and for every element that lies in a specific county
                    for(var i = 0; i < results.length; i++){
                        if(results[i].county_number == county){
                            // add the temperature of the station in the county and count up 1
                            temporary_air_temp += results[i].air_temperature;
                            temporary_road_temp += results[i].road_temperature;

                            stations_per_county++;
                        }
                        
                    }
                    // if there is any stations in a county, add the calculated avg to the list
                   
                    temperatures.push([county,temporary_air_temp/stations_per_county, temporary_road_temp/stations_per_county]);

                    

                    county++;

                    
                }


                
                // send data back to client
                res.send(temperatures);

                auth.decreaseMutex();

                if(auth.getMutex() == 0){
                    mysqlssh.close()
                }

            });

        }).catch(err => {
            console.log(err)
        }) 
    }
};