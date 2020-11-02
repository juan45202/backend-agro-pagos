const {Pool, Client} = require("pg");

class ServicePostgres {

    constructor(){
        this.Pool = new Pool({
            user: process.env.OFERTA_DB,
            host: process.env.HOST_DB,
            database: process.env.DB,
            password: process.env.PASSWORD_DB,
            port: process.env.PORT_DB,
        });
    }

    async execute(sql,values){
        if(values){
            return await this.Pool.query(sql, values);
        }else{
            return await this.Pool.query(sql);
        }
        
    }

}

module.exports = ServicePostgres;