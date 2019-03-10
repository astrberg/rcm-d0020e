const fs = require('fs');

class Authorization{
    constructor(){
        this.database = {
            host: 'localhost',
            user: 'java',
            password: 'password',
            database: 'db'
            };
    
//        this.ssh = {
//            host: '130.240.204.191',
//            user: 'bugmana',
//            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
//        };

        this.mutex = 0;
    }
  
    increaseMutex(){
        this.mutex++;
        
    }
    decreaseMutex(){
        this.mutex--;
    }
    getMutex(){
        return this.mutex;
    }
}

module.exports.Authorization = new Authorization();
