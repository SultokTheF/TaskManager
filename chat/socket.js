const ChatModel = require('./models/Chat');

async function initSocket(io) {
  io.on('connection', async (socket) => {
    console.log('A user connected');

    // Listen for new messages
    socket.on('chatMessage', async (data) => {
      try {
        // Save message to MongoDB
        const chatMessage = new ChatModel(data);
        await chatMessage.save();

        // Broadcast the message to all connected clients
        io.emit('chatMessage', data);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Load previous messages from MongoDB
    try {
      const messages = await ChatModel.find().sort({ timestamp: 1 });
      // Send previous messages to the connected client
      socket.emit('loadMessages', messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = { initSocket };