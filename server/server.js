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

    // admin massage to our user
    socket.emit('newMassage',{
        from: 'Admin',
        text: 'Welcome to our chat-app'
    });

    // broadcast to other user that new joined.
    socket.broadcast.emit('newMassage',{
        from: 'admin',
        text: 'new user joined welcome him'
    });


    socket.on('createMassage',(massage)=>{
        console.log('massge got from:: ', massage);
        io.emit('newMassage',{
            from: massage.from,
            text: massage.text,
            createdAt: new Date().getTime()
        });
    });


    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});