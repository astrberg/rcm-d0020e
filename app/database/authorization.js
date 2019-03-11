const fs = require('fs');
const mysql = require("mysql");

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
        this.con = "";
        this.conFlag = 0;
    }
    
    createConnection(){
        if(this.conFlag == 0){
            this.con = mysql.createConnection(this.database);
            this.conFlag = 1;
        }
    }

    getConnection(){
        return this.con;
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
