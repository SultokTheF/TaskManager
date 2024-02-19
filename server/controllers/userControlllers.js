const User = require("../models/User");

class UserController {
  // Get all users (for admins only)
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password -__v');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Get user details by token
  async getUserByToken(req, res) {
    try {
      const userID = req.user.id;

      if (!userID) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = await User.findById(userID).select('-password -__v');

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID parameter is required" });
      }

      const user = await User.findById(userId).select('-password -__v');

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
  
      if (!username) {
        return res.status(400).json({ message: "Username parameter is required" });
      }
  
      const user = await User.findOne({ username }).select('-password -__v');
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }  


  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const userData = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID parameter is required" });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user fields
      Object.keys(userData).forEach(key => {
        if (key !== '_id') { // Ensure we don't update the user ID
          user[key] = userData[key];
        }
      });
  
      await user.save();
  
      return res.json({ message: "User updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
