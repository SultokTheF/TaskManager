const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { initSocket } = require('./socket');

const PORT = 8081;
const DB_URL = "mongodb+srv://zarina:JvMCJBGXFHDfBLfZ@test.vkiuorm.mongodb.net/";

const app = express();
const server = http.createServer(app);

// CORS configuration for Express
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize socket connection with CORS configuration for Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize socket events
initSocket(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});