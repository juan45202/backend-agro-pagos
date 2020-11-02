const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();

const getVideos = async (request, response)=>{
    try {
        const sql = "SELECT * FROM agropagos.video";
        let resDB = await _servicePg.execute(sql);
        let rowCount = resDB.rowCount;
        let rows = resDB.rows;
        let responseJSON = {};
        responseJSON.message='Videos subidos';
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

const saveVideos = async (request, response)=>{
    try {
        
        let sql = "INSERT INTO agropagos.video(id_video, id_usuario, id_producto, categoria, video)";
        sql+= "VALUES($1, $2, $3, $4, $5)";
        let body = request.body;
        let values = [
            body.id_video, body.id_usuario, body.id_producto, body.categoria, body.video
        ]
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Video guardado';
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

const updateVideos = async (request, response)=>{

    try {
        
        let sql = "UPDATE agropagos.video SET id_video=$1, id_usuario=$2, id_producto=$3, categoria=$4, video=$5 WHERE id_video=$6";
        let id = request.params.id;
        let body = request.body;
        let values = [
            body.id_video, body.id_usuario, body.id_producto, body.categoria, body.video, id
        ];
        await _servicePg.execute(sql, values);
        let responseJSON = {};
        responseJSON.message='Video actualizado';
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

const deleteVideos = async (request, response)=>{
    try {
        const sql = "DELETE FROM agropagos.video WHERE id_video=$1";

        let id = request.params.id;
    
        let resDB = await _servicePg.execute(sql, [id]);
        let rowCount = resDB.rowCount;
        let responseJSON = {};
        responseJSON.message='Video eliminado';
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

module.exports = {getVideos, saveVideos, updateVideos, deleteVideos};