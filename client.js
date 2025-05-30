const socket = io();
const editor = document.getElementById('editor');
const usersElement = document.getElementById('users');

// Handle incoming content updates
socket.on('content-update', (content) => {
    if (content !== editor.value) {
        editor.value = content;
    }
});

// Handle user count updates
socket.on('users-count', (count) => {
    usersElement.textContent = `${count} user${count !== 1 ? 's' : ''} online`;
});

// Send updates to server
editor.addEventListener('input', () => {
    socket.emit('content-update', editor.value);
});

// Initialize with server content
socket.on('connect', () => {
    console.log('Connected to server');
});