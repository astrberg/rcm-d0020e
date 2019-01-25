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
    testConnection : function(req, res, next){
       

        let auth = new authorization.Authorization();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {

            // get rowcount of weather
            client.query('SELECT COUNT(*) FROM `weather_data`', function (err, results, fields) {
                if (err) throw err
                console.log(results);
                mysqlssh.close()

                res.sendStatus(200);
            })

        }).catch(err => {
            console.log(err)
        })
        
    }
};