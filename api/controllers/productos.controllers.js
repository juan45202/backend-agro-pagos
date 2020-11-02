const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();



const getProductos = async (request, response)=>{
    try {
        const sql = "SELECT * FROM agropagos.producto";
        let resDB = await _servicePg.execute(sql);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Productos creados';
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

const saveProductos = async (request, response)=>{
    try {

        let sql = "INSERT INTO agropagos.producto(id_producto, id_usuario, nombre, precio_base, fecha, descripcion)";
        sql+= "VALUES($1, $2, $3, $4, $5, $6)";
        let body = request.body;
        let values = [
            body.idProducto, body.idusuario, body.nombre, body.precioBase, body.fecha, body.descripcion 
        ]
        let resDB = await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Producto agregado';
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

const updateProductos = async (request, response)=>{

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

const deleteProductos = async (request, response)=>{
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

module.exports = {getProductos, saveProductos, updateProductos, deleteProductos};