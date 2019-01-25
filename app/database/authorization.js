const fs = require('fs');

class Authorization{
    constructor(){
        this.database = {
            host: 'localhost',
            user: 'java',
            password: 'password',
            database: 'db'
            };
    
        this.ssh = {
            host: '130.240.204.191',
            user: 'bugmana',
            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
        }; 
    }
}

module.exports.Authorization = Authorization;