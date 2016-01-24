var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8081);

console.log("Starting server on port 8081");

io.on('connection', function (socket) {

  socket.on('login', function (data) {
    console.log("User connected with id:" + data);
    socket.room = data;
    socket.join(data);
    io.sockets.in(socket.room).emit("force-login", "new-user");
  });

  socket.on('pos', function (data) {
    console.log(socket.room + " : " + data);
    io.sockets.in(socket.room).emit('pos', data);
  });

  socket.on('cmd', function (data) {
    console.log(data);
    io.sockets.in(socket.room).emit('cmd', data);
  });

  socket.emit("force-login", "startup");

});