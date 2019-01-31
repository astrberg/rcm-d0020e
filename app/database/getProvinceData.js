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
            var sql = "select * from (\
                            select * from (\
                                select w.id, w.air_temperature, s.county_number from weather_data w, station_data s \
                                    where w.station_id = s.id) as g order by g.id desc limit 576) as t order by t.county_number asc";
            
                    
            var values =  [county_number, start_time.toISOString(), stop_time.toISOString()];

            client.query(sql, function (err, results) {
                if (err) throw err
                
                mysqlssh.close()
                
                var temperatures = [];
                
                // smalest county number is 2
                var county = 0;

                // highest county number is 25, loop up to that
                while(county < 26){
                    var temporary_temp= 0;
                    var stations_per_county = 0;

                    // loop through the given values and for every element that lies in a specific county
                    for(var i = 0; i < results.length; i++){
                        if(results[i].county_number == county){
                            // add the temperature of the station in the county and count up 1
                            temporary_temp += results[i].air_temperature;
                            stations_per_county++;
                        }
                        
                    }
                    // if there is any stations in a county, add the calculated avg to the list
                   
                    temperatures.push([county,temporary_temp/stations_per_county]);

                    

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