const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { HubConnectionBuilder } = require('@microsoft/signalr');
const { createServer } = require('webrtc');

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Store connections
let peers = {};

// SignalR Hub
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle signaling messages
  socket.on('signal', (data) => {
    const { to, from, signal } = data;
    if (peers[to]) {
      io.to(to).emit('signal', { from, signal });
    }
  });

  socket.on('disconnect', () => {
    delete peers[socket.id];
    console.log('A user disconnected:', socket.id);
  });

  peers[socket.id] = socket.id; // Save connected user
});

// TURN/STUN server configuration
const turnConfig = {
  urls: 'turn:turn.yourserver.com:3478',
  username: 'user',
  credential: 'password',
};

// Handle WebRTC signaling
app.post('/offer', (req, res) => {
  const { offer } = req.body;

  const pc = createServer({
    iceServers: [turnConfig],
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log('ICE Candidate:', event.candidate);
    }
  };

  pc.setRemoteDescription(offer)
    .then(() => pc.createAnswer())
    .then((answer) => {
      pc.setLocalDescription(answer);
      res.json(answer);
    })
    .catch((err) => console.error(err));
});

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
