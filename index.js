const express = require('express');
const Instance = require('./src');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, "src/Public")));

io.users = 0;

io.on('connection', client => {
    console.log(`Client ${client.id} conectou!`);

    io.users++;

    new Instance(io, client);

    client.on('disconnect', () => {
        console.log(`Client ${client.id} desconectou!`)
        io.users--;
    })
})



http.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});