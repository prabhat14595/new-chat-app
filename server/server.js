const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user connected');

    socket.emit('newMassage',{
        from:'prabhat',
        text: 'this is a maasage from me ',
        createdAt: 1323
    });

    socket.on('createMassage',(massage)=>{
        console.log('massge got from:: ', massage);
    });


    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});