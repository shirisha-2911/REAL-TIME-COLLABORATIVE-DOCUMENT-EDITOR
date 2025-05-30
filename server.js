const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(__dirname));

// Store document state
let documentContent = "Welcome to the collaborative editor!";
let usersCount = 0;

io.on('connection', (socket) => {
    usersCount++;
    io.emit('users-count', usersCount);
    
    // Send current content to new user
    socket.emit('content-update', documentContent);
    
    // Handle content updates
    socket.on('content-update', (content) => {
        documentContent = content;
        socket.broadcast.emit('content-update', content);
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        usersCount--;
        io.emit('users-count', usersCount);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});