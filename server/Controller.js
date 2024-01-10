const User = require("./models/User");
const Role = require("./models/Role");

const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config")

const generateAccessToken = (user) => {
    const payload = { // Data that encrypted in our jwt 
        user: {
            id: user._id,
            username: user.username,
            roles: user.roles,
        },
    };

    return jwt.sign(payload, secret, { expiresIn: "24h" });
};
const generateRefreshToken = (user) => {
    // Example: Generating a simple refresh token with user information
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
    };
  
    // You can customize the expiresIn and other options based on your needs
    return jwt.sign(payload, secret, { expiresIn: "30d" }); // 30 days expiration
  };


class authController {
    async register(req, res) {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()) { //  Костыль. Need to refactor this part
                return res.status(400).json({message: "Resiter error on Validation", error});
            }
            const {username, email, firstname, lastname, password} = req.body; // Get responce body
            const candidate = await User.findOne({value: "USER"}); // Check if entered userneme is unique

            if(candidate) {
                return res.status(400).json({message: "This username is already in use"});
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, email, firstname, lastname, password: hashPassword, roles: [userRole.value], profile_image: Math.floor(Math.random() * 9) + 1}) // Create new User
            await user.save();

            return res.json({message: "User reqister success"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Register error', error: e});
        }
    }

    async login(req, res) {
        try {
            const { username, password, refreshToken } = req.body;
    
            // Add these console.log statements to check the values
            console.log('Received username:', username);
            console.log('Received refreshToken:', refreshToken);
    
            if (refreshToken) {
                let refreshedUser;
                try {
                    const decodedRefreshToken = jwt.verify(refreshToken, secret);
                    refreshedUser = decodedRefreshToken.user;
                } catch (error) {
                    console.log(error);
                    return res.status(401).json({ message: 'Invalid refresh token' });
                }
    
                // Add this console.log statement to check the refreshed user
                console.log('Refreshed user:', refreshedUser);
    
                // Continue with the token generation logic using the refreshed user
                const userForAccessToken = {
                    _id: refreshedUser.id, // Use 'id' instead of '_id'
                    username: refreshedUser.username,
                    roles: refreshedUser.roles,
                };
    
                const token = generateAccessToken(userForAccessToken);
                const newRefreshToken = generateRefreshToken(refreshedUser);
    
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
                });
    
                return res.json({ token, newRefreshToken });
            }
    
            // Continue with the existing logic for the case when refreshToken is not provided
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }
    
            // Ensure that the user object has the required properties
            const userForAccessToken = {
                _id: user._id,
                username: user.username,
                roles: user.roles,
            };
    
            const token = generateAccessToken(userForAccessToken);
            const newRefreshToken = generateRefreshToken(user);
    
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
            });
    
            return res.json({ token, newRefreshToken });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Login error' });
        }
    }
    
    
    
    
    async getUsers(req, res) {
        try {
            const userRoles = req.user.roles;
    
            if (userRoles.includes("ADMIN")) {
                const users = await User.find();
                res.json(users);
            } else {
                res.status(403).json({ message: 'Permission denied' });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Users error' });
        }
    }
    

    async getUserByToken(req, res) {
        try {
            const userID = req.user.id;
    
            if (!userID) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = await User.findOne({ _id: userID }).select('-password').select('-__v');
            
            return res.json({ user });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    

}

module.exports = new authController();