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
    getStationData : function(req, res, next){
       
        let auth = authorization.Authorization;
        auth.increaseMutex();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // get all station data that have weather data
            const sql = `select * from station_data where id in (select distinct station_id from 
                        (select station_id from weather_data as w order by w.id desc limit 894) as g)`;
            
            client.query(sql, function (err, results, fields) {
                if (err) throw err
                
                
                // send data back to client
                res.send(results);

                auth.decreaseMutex();

                if(auth.getMutex() == 0){
                    mysqlssh.close()
                }
            })

        }).catch(err => {
            console.log(err)
        }) 
    }
};