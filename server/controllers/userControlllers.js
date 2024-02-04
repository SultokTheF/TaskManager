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
}

module.exports = new UserController();
