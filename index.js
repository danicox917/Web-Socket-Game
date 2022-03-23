//this is the server
//don't touch this
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var events = require('events');
var eventEmitter = new events.EventEmitter();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
  //user connection
  console.log('a user connected');
  io.emit("users",1);
  //user disconnection
  socket.on('disconnect', (reason) => {
    console.log('user disconnected because '+reason);
    io.emit("users",-1);
  });
  //functions
  socket.on("blah", message => {
    console.log(message);
    io.emit("blah",message);
  });
});

//don't touch this
server.listen(3000, () => {
  console.log('listening on *:3000')
});
