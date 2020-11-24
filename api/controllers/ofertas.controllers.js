const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();

const getOfertasAceptadas = async (request, response)=>{
    try {
        let sql = "select u.nombre usuario, p.nombre producto, p.precio_base precio, o.metodos, o.valoroferta, o.id_oferta, o.estado ";
        sql+= "from agropagos.ofertas o inner join agropagos.producto p on o.id_producto = p.id_producto ";
        sql+= "inner join agropagos.usuario u  on o.cliente = u.id_usuario where p.id_usuario=$1;";
        
        let body = request.body;
        let values = [
            body.id_usuario
        ]
        let resDB = await _servicePg.execute(sql, values);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Ofertas creadas';
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

const getOfertas = async (request, response)=>{
    try {
        let sql = "select u.nombre usuario, p.nombre producto, p.precio_base precio, o.metodos, o.valoroferta, o.id_oferta ";
        sql+= "from agropagos.ofertas o inner join agropagos.producto p on o.id_producto = p.id_producto ";
        sql+= "inner join agropagos.usuario u  on o.cliente = u.id_usuario where p.id_usuario=$1 AND o.estado != 'aceptado';";
        
        let id = request.params.id;
        let resDB = await _servicePg.execute(sql, [id]);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Ofertas creadas';
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
        
        let sql = "INSERT INTO agropagos.ofertas(id_producto, metodos, ValorOferta, cliente)";
        sql+= "VALUES($1, $2, $3, $4)";
        let body = request.body;
        let values = [
            body.id_producto, body.metodos, body.ValorOferta, body.cliente
        ]
        let resDB = await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Oferta guardada';
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

const updateOfertas = async (request, response)=>{

    try {
        
        let sql = "UPDATE agropagos.ofertas SET estado=$1 WHERE id_oferta=$2";
        let id = request.params.id;
        let body = request.body;
        let values = [
            body.estado, body.id_oferta
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
        const sql = "DELETE FROM agropagos.ofertas WHERE id_oferta=$1";

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

module.exports = {getOfertas, savetOfertas, updateOfertas, deleteOfertas, getOfertasAceptadas};