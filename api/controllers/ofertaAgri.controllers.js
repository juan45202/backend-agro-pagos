const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();


const getOfertasAceptadas = async (request, response)=>{
    try {
        let sql = "select u.nombre usuario, p.nombre producto, p.precio_base precio, o.metodos, o.valoroferta, o.id_oferta, o.estado ";
        sql+= "from agropagos.ofertas o inner join agropagos.producto p on o.id_producto = p.id_producto ";
        sql+= "inner join agropagos.usuario u  on o.cliente = u.id_usuario where p.id_usuario=$1 AND o.estado = 'aceptado';";
        
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

module.exports = {getOfertasAceptadas};