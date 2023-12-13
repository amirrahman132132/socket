const express = require('express');
const http = require('http');
const path = require("path");
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '/public')))

// Set up Socket.IO
const io = socketIO(server , {
    cors : '*'
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('chatMessage', (message) => {
    console.log(`Received message from ${socket.id}: ${message}`);
    // Broadcast the message to all clients
    io.emit('chatMessage', {
      sender: socket.id,
      message: message,
    });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
