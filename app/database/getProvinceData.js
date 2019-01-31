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
    getAverageTempProvince : function(req, res, next){
       
        let auth = new authorization.Authorization();


        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // select avg temps from stations in county over the last 15 min
            var sql =  "SELECT * FROM (\
                            SELECT * FROM (\
                                SELECT w.id, w.air_temperature, s.county_number FROM weather_data w, station_data s \
                                WHERE w.station_id = s.id) \
                            AS g ORDER BY g.id DESC LIMIT 576) \
                        AS t ORDER BY t.county_number ASC";
                    
            client.query(sql, function (err, results) {
                if (err) throw err
                
                mysqlssh.close()
                
                let temperatures = [];
                
                // smalest county number is 2
                let county = 2;

                // highest county number is 25, loop up to that
                while(county < 26){
                    let temporary_temp= 0;
                    let stations_per_county = 0;

                    // loop through the given values and for every element that lies in a specific county
                    for(var i = 0; i < results.length; i++){
                        if(results[i].county_number == county){
                            // add the temperature of the station in the county and count up 1
                            temporary_temp += results[i].air_temperature;
                            stations_per_county++;
                        }
                        
                    }
                    // if there is any stations in a county, calculated the avg and add to the list
                    if(stations_per_county > 0){
                        temperatures.push([county,temporary_temp/stations_per_county]);

                    }

                    county++;
                }
                
                

                // send data back to client
                res.send(temperatures);
            });

        }).catch(err => {
            console.log(err)
        }) 
    }
};