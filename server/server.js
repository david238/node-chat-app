const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

//popular event: connection
io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit('newMessage', {
      from: 'mike@example.com',
      text: 'Hey what is going?',
      createdAt: 123
    });

    socket.on('createMessage', (newMsg) => {
      console.log('createMessage', newMsg);
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
