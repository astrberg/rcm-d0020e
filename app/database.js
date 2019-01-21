const mysqlssh = require('mysql-ssh');
const fs = require('fs');

console.log("db");


var ssh = {
            host: '130.240.204.191',
            user: 'bugmana',
            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
            };

var database = {
            host: 'localhost',
            user: 'java',
            password: 'password',
            database: 'db'
            };

/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    testConnection : function(req, res, next){
        
        // ssh to database server and then connect to db
        mysqlssh.connect(ssh, database).then(client => {

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
        
    },
};