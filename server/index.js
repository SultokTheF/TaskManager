const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectroutes");
const taskRoutes = require("./routes/taskRoutes");

// Create an Express app
const app = express();

// Middleware setup
app.use(cors());        // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Use the routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Set the port number (use process.env.PORT for production)
const PORT = process.env.PORT || 8080;

// MongoDB connection URL (replace with your actual database URL)
const DB_URL = "mongodb+srv://zarina:JvMCJBGXFHDfBLfZ@test.vkiuorm.mongodb.net/";

// Define a function to start the server
const start = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Call the start function to initiate server startup
start();
