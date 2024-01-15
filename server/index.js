const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("./Router");

const PORT = 8080;
const DB_URL = "mongodb+srv://zarina:JvMCJBGXFHDfBLfZ@test.vkiuorm.mongodb.net/";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", Router);

const start = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Start the server
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
