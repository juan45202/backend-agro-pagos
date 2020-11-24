const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = require
module.exports = {

    createToken(usuario){
        let privateKey = fs.readFileSync('api/config/private.key').toString();
        return jwt.sign(usuario, privateKey, {expiresIn: "1h"}, )
    },
    validToken(token){
        let privateKey = fs.readFileSync('api/config/private.key').toString();
        return jwt.verify(token, privateKey);
    }



}