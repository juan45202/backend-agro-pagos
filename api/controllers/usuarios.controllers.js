const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();


const getUsuarioTransporte = async (request, response)=>{
    try {
        const sql = "SELECT u.nombre, u.apellido, u.telefono, u.correo FROM agropagos.usuario u WHERE u.rol='Transportista'";
        let resDB = await _servicePg.execute(sql);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Usuarios creados';
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

const getUsuarios = async (request, response)=>{
    try {
        const sql = "SELECT * FROM agropagos.usuario WHERE id_usuario=$1";
        let id = request.params.id;    
        let resDB = await _servicePg.execute(sql, [id]);

        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Usuarios creados';
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

const saveUsuarios = async (request, response)=>{
    try {
        
        let sql = "INSERT INTO agropagos.usuario(id_usuario, nombre, apellido, telefono, correo, rol, contraseña)";
        sql+= "VALUES($1, $2, $3, $4, $5, $6, $7)";
        let body = request.body;
        let values = [
            body.id_usuario, body.nombre, body.apellido, body.telefono, body.correo, body.rol, body.contraseña
        ]
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Usuario creado';
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

const updateUsuarios = async (request, response)=>{

    try {

        let sql = "UPDATE agropagos.usuario SET id_usuario=$1, nombre=$2, apellido=$3, telefono=$4, correo=$5, rol=$6, contraseña=$7 WHERE id_usuario=$8";
        let id = request.params.id;
        let body = request.body;
        let values = [
            body.id_usuario, body.nombre, body.apellido, body.telefono, body.correo, body.rol, body.contraseña, id
        ];
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Usuario Actualizado';
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

const deleteUsuarios = async (request, response)=>{
    try {
        const sql = "DELETE FROM agropagos.usuario WHERE id_usuario=$1";
        let id = request.params.id;
    
        let resDB = await _servicePg.execute(sql, [id]);
        let rowCount = resDB.rowCount;
        let responseJSON = {};
        responseJSON.message='Usuario eliminado';
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

module.exports = {getUsuarios, saveUsuarios, updateUsuarios, deleteUsuarios, getUsuarioTransporte};