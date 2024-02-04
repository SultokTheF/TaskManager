const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");
const User = require("../models/User");
const Role = require("../models/Role");

const generateAccessToken = (user) => {
  const payload = { 
    user: {
      id: user._id,
      username: user.username,
      roles: user.roles,
    },
  };

  return jwt.sign(payload, secret, { expiresIn: "30m" });
};

const generateRefreshToken = (user) => {
  const payload = {
    user: {
      id: user._id,
      username: user.username,
      roles: user.roles,
    },
  };

  return jwt.sign(payload, secret, { expiresIn: "30d" }); 
};

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) { 
        return res.status(400).json({ message: "Validation error", errors });
      }

      const { username, email, firstname, lastname, password } = req.body; 
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const userRole = await Role.findOne({ value: "USER" });
      const newUser = new User({
        username,
        email,
        firstname,
        lastname,
        password: hashedPassword,
        roles: [userRole.value],
        profile_image: Math.floor(Math.random() * 9) + 1,
      });

      await newUser.save();

      return res.json({ message: "User registration successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password` });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers.authorization.split(" ")[1];
      if (!refreshToken) {
        return res.status(400).json({ message: "RefreshToken is required" });
      }

      const decodedToken = jwt.verify(refreshToken, secret);
      const user = await User.findById(decodedToken.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      return res.json({ newAccessToken, newRefreshToken });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
}

module.exports = new AuthController();
