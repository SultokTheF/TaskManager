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
            const { username, password } = req.body;
            const user = await User.findOne({ username });
    
            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }
    
            const validPassword = bcrypt.compareSync(password, user.password);
    
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` });
            }
    
            const token = generateAccessToken(user);
    
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
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