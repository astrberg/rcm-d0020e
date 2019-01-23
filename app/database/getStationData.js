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
       

        let auth = new authorization.Authorization();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            
            // get all station data that have weather data
            const sql = 'SELECT * FROM station_data WHERE id IN (SELECT station_id FROM weather_data)';

            client.query(sql, function (err, results, fields) {
                if (err) throw err
                
                mysqlssh.close()
                

                // send data back to client
                res.send(results);
            })

        }).catch(err => {
            console.log(err)
        })
        
    }
};