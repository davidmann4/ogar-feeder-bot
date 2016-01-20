var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8081);

console.log("Starting server on port 8081");

io.on('connection', function (socket) {

  socket.on('login', function (data) {
  	console.log(data);
	socket.join(data.user);
  });

  socket.on('pos', function (data) {
	console.log(data);
	io.emit('pos', data);
  });

  socket.on('cmd', function (data) {
	console.log(data);
    io.emit('cmd', data);
  });

});