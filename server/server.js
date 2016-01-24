var config = require('../config');
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(config.serverPort);

console.log("Starting server on port "+config.serverPort);

io.on('connection', function (socket) {

  socket.on('login', function (data) {
    console.log("User connected with id:" + data.uuid);
    socket.room = data.uuid;
    socket.join(data.uuid);

    if(data.type == "server"){
      io.sockets.in(socket.room).emit("force-login", "server-booted-up");      
    }
    
  });

  socket.on('pos', function (data) {
    //console.log(socket.room + " : " + data);
    io.sockets.in(socket.room).emit('pos', data);
  });

  socket.on('cmd', function (data) {
    console.log(data);
    io.sockets.in(socket.room).emit('cmd', data);
  });

  socket.emit("force-login", "startup");

});
