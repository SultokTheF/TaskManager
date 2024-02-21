const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: mongoose.Schema.Types.ObjectId,
  message: String,
  timestamp: {
    type: String, // Change the type to String to store only the time
    default: new Date().toLocaleTimeString(), // Set the default value to the current time
  },
  project: mongoose.Schema.Types.ObjectId,
  username: String,
  profileImage: {
    type: Number, // Assuming the profile image is a URL, change the type accordingly
    default: 0, // Set a default profile image if needed
  }
});

module.exports = mongoose.model('Chat', chatSchema);