const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();


const getProductoUpdate = async (request, response)=>{
    try {
        
        const sql = "SELECT * FROM agropagos.producto WHERE id_producto=$1";
        let body = request.body;
        let values = [body.id_producto];

        let resDB = await _servicePg.execute(sql, values);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Producto a editar';
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

const getProducto = async (request, response)=>{
    try {
        const sql = "SELECT * FROM agropagos.producto WHERE id_usuario=$1";
        let id = request.params.id;
        let resDB = await _servicePg.execute(sql, [id]);
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

        let sql = "INSERT INTO agropagos.producto(id_usuario, nombre, precio_base, fecha, descripcion, panel)";
        sql+= "VALUES($1, $2, $3, $4, $5, $6)";
        let body = request.body;
        let values = [
            body.id_usuario, body.nombre, body.precio_base, body.fecha, body.descripcion , body.panel
        ]
        console.log(body);
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Producto agregado';
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

const updateProductos = async (request, response)=>{

    try {
        let sql = "UPDATE agropagos.producto SET  nombre=$1, precio_base=$2, fecha=$3, descripcion=$4 WHERE id_producto=$5";
        let id = request.params.id;
        let body = request.body;
        let values = [
            body.nombre, body.precio_base, body.fecha, body.descripcion, id
        ];
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Producto Actualizado';
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
        
        const sql = "DELETE FROM agropagos.producto WHERE id_producto=$1";
        let id = request.params.id;
        let resDB = await _servicePg.execute(sql, [id]);
        let rowCount = resDB.rowCount;
        let responseJSON = {};
        responseJSON.message='Producto eliminado';
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

module.exports = {getProductos, saveProductos, updateProductos, deleteProductos, getProducto, getProductoUpdate};