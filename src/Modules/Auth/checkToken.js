const jwt = require('jsonwebtoken');
const {secret} = require('../../config.json');

function Erro(codigo = 0, msg = "Erro inesperado!"){
    this.codigo = codigo;
    this.msg    = msg;
}

function checkToken(token){
    try{

        if(!token || token === null || token === "null") throw new Erro(1, "Token inexistente.")

        if(typeof token !== "string") throw new Erro(2, "Tipo do token inválido!");

        if(token.split(" ").length == 2){
            if(token.split(" ")[0] === "Bearer"){
                token = token.split(" ")[1];
            }
        }

        try {
            const decoded = jwt.verify(token, secret);
            return {decoded: true, ...decoded};
        } catch(e){
            throw e
        }

    }catch(e){
        return e;
    }
}

module.exports = checkToken;