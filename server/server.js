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

    socket.on('createMessage', (message) => {
      console.log('createMessage', message);

      //emit to all io opened
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });
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
