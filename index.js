const express = require('express');
const Instance = require('./src');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const PORT = 3001;
const mongoose = require('mongoose');
const checkToken = require('./src/Modules/Auth/checkToken');

mongoose.connect('mongodb://inforiver:admin123@geonosis.mongodb.umbler.com:49233/inforiver', {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => {
    console.log("Falha ao conectar no banco de dados", err)
})



app.use(express.static(path.resolve(__dirname, "src/Public")));

io.use((socket, next) => {
    try {
        const {token} = socket.handshake.query;
        const status = checkToken(token);
        

        socket.user = {}
        

        if(!status.decoded){
            const erro = new Error("Houve um problema na autenticação");
            switch(status.codigo){
                case 1:
                    socket.user.isGuest = true;
                    next();
                    break;
                case 3:
                    erro.message += '\n  > Código 003 - [Token inválido]';
                default:
                    if(status.msg) erro.message += `\n  > ${status.msg}`;
                    throw erro; 
            }
        } else {
            socket.user.isGuest = false;
            socket.user = {...socket.user, ...status};
            delete socket.user.decoded
            next();
        }
        
    } catch(e){
        console.log("index", e);
        next(e.message);
    }
    return;
})

io.on('connection', client => {
    const instance = new Instance(io, client);
})



http.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});