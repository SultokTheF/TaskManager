const User = require("../models/User");

class UserController {
  // Get all users (for admins only)
  async getUsers(req, res) {
    try {
      const userRoles = req.user.roles;

      if (userRoles.includes("ADMIN")) {
        const users = await User.find();
        res.json(users);
      } else {
        res.status(403).json({ message: 'Permission denied' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Users error' });
    }
  }

  // Get user details by token
  async getUserByToken(req, res) {
    try {
      const userID = req.user.id;

      if (!userID) {
        return res.status(404).json({ message: "User not found" });
      }

      // Selecting only necessary fields and excluding sensitive information
      const user = await User.findOne({ _id: userID }).select('-password -__v');
      
      return res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Get user details by username
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({ message: "Username parameter is required" });
      }

      // Selecting only necessary fields and excluding sensitive information
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
}

module.exports = new UserController();
