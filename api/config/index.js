process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("Enviroment " + process.env.NODE_ENV);

if(process.env.NODE_ENV == 'dev'){
    process.env.OFERTA_DB = "postgres";
    process.env.HOST_DB = "localhost";
    process.env.DB = "postgres";
    process.env.PASSWORD_DB = "admin";
    process.env.PORT_DB = 5432;

}else if(process.env.NODE_ENV == 'produccion'){

    process.env.OFERTA_DB = "";
    process.env.HOST_DB = "";
    process.env.DB = "agro-pagos";
    process.env.PASSWORD_DB = "";
    process.env.PORT_DB = 5432;
}

