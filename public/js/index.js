var socket = io();

socket.on('connect', function(){
    console.log('connected to the server');
});

socket.on('disconnect', function(){
    console.log('disconnected to the server');
});

socket.on('newMassage', function(massage){
    console.log("Got new massage:: ",massage);
});