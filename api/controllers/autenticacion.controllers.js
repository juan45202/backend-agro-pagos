const ServicePostgres = require('../services/postgres');
const _servicePg = new ServicePostgres();

const jwt = require('../services/jwt')


const loginUsuario = async (request, response)=>{
    let responseJSON = {};
    responseJSON.ok=true;
    try {
        const sql = "SELECT id_usuario, nombre, apellido, correo, rol from agropagos.usuario u where u.correo =$1 and contraseña =$2";
        let body = request.body
        let values = [body.correo, body.contraseña]
        let resDB = await _servicePg.execute(sql, values);
        let rowCount = resDB.rowCount;
        if (rowCount == 1) {
            let rows = resDB.rows[0];
            responseJSON.message='Usuario encontrado';
            responseJSON.info=jwt.createToken(rows);
            response.send(responseJSON);
        }else{
            responseJSON.ok=false;
            responseJSON.message='Usuario no encontrado';
            responseJSON.info=[];
            response.status(404).send(responseJSON);
        }
        
        
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=false;
        responseJSON.message=error.message;
        response.status(400).send(responseJSON);
    }
    
}

const middleware = async (request, response, next)=>{
    
    try {
        let token=decifrarToken(request);
        request._token = token;
        next();
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok=true;
        responseJSON.ok=false;
        responseJSON.message="Error while valid middleware";
        responseJSON.info = error
        response.status(400).send(responseJSON);
    }
};

const notFound = async (request, response)=>{
    let responseJSON = {};
    responseJSON.ok=true;
    responseJSON.ok=false;
    responseJSON.message="Error, endpoint not found";
    responseJSON.info = request.url;
    response.status(400).send(responseJSON);
};

const autenToken = async (request, response)=>{
    let responseJSON = {};
    responseJSON.ok=true;
    
    try {
        responseJSON.message='Usuario encontrado';
        responseJSON.info=decifrarToken(request);
        response.send(responseJSON);

    } catch (error) {
        responseJSON.ok=false;
        responseJSON.message="Error while valid token";
        responseJSON.info = error
        response.status(400).send(responseJSON);
    }
};

const decifrarToken = (request)=>{
    let headers = request.headers.authorization.split(" ");
    let token = headers[1];
    return jwt.validToken(token); 
}

module.exports = {loginUsuario, autenToken, middleware, notFound};