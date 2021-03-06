const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

//popular event: connection
io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to Chat App'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);

      //emit to all io opened
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords)=>{
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=> {
      console.log('Client has disconnected');
    });

});

server.listen(port, () => {
  console.log(`Started on Port ${port}`);
});

//create a herolu application and deploy to it.
//visit heroku app on browser.
