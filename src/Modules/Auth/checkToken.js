const jwt = require('jsonwebtoken');
const {secret} = require('../../config.json');

const erro = {status: false, msg: "Token inválido!"}

const checkToken = _token => {
    if(!_token){
        return {...erro, codigo: 1}
    }

    const parts = _token.split(" ");

    if(parts.length != 2){
        return {...erro, codigo: 2}
    }

    const [bearer, token] = parts;

    if(bearer !== "Bearer"){
        return {...erro, codigo: 3};
    }

    try {
        jwt.verify(token, secret)
        return {status: true}

    } catch(e){
        return {...erro, msg: e.message, codigo: 4};
    }
    
}


module.exports = checkToken;