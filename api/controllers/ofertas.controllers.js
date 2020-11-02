const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();

const getOfertas = async (request, response)=>{
    try {
        const sql = "SELECT * FROM postgres.public.ofertas";
        let resDB = await _servicePg.execute(sql);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Oferta ok';
        responseJSON.ok=true;
        responseJSON.info=rows;
        responseJSON.metainfo = {total : rowCount};
        response.send(responseJSON);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=false;
        responseJSON.message=error.message;
        response.status(400).send(responseJSON);
    }
    
}

const savetOfertas = async (request, response)=>{
    try {
        let sql = "INSERT INTO postgres.public.ofertas(id_oferta, producto, valor, metodo, valoroferta)";
        sql+= "VALUES($1, $2, $3, $4, $5)";
        let body = request.body;
        let values = [
            body.id_oferta, body.producto, body.valor, body.metodo, body.valoroferta
        ]
        let resDB = await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Oferta guardada';
        responseJSON.ok=true;
        responseJSON.info=body;
        response.send(resDB);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=false;
        responseJSON.message=error.message;
        response.status(400).send(responseJSON); 
    }
    
}

const updateOfertas = async (request, response)=>{

    try {

        let sql = "UPDATE postgres.public.ofertas SET id_oferta=$1, producto=$2, valor=$3, metodo=$4, valoroferta=$5 WHERE id_oferta=$6";
        let id = request.params.id;
        let body = request.body;
        let values = [
            body.id_oferta, body.producto, body.valor, body.metodo, body.valoroferta, id
        ];
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Oferta Actualizada';
        responseJSON.ok=true;
        responseJSON.info=body;
        response.send(responseJSON);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=false;
        responseJSON.message=error.message;
        response.status(400).send(responseJSON);
    }

    
}

const deleteOfertas = async (request, response)=>{
    try {
        const sql = "DELETE FROM postgres.public.ofertas WHERE id_oferta=$1";

        let id = request.params.id;
    
        let resDB = await _servicePg.execute(sql, [id]);
        let rowCount = resDB.rowCount;
        let responseJSON = {};
        responseJSON.message='Oferta eliminada';
        responseJSON.ok=true;
        responseJSON.info=[];
        responseJSON.metainfo = {total : rowCount};
        response.send(responseJSON);
        
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=false;
        responseJSON.message=error.message;
        response.status(400).send(responseJSON);
    }
    
}

module.exports = {getOfertas, savetOfertas, updateOfertas, deleteOfertas};