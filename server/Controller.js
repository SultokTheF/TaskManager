const User = require("./models/User");
const Role = require("./models/Role");
const bycrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = { // Data that encrypted in our jwt 
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
    async register(req, res) {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()) { //  Костыль. Need to refactor this part
                return res.status(400).json({message: "Resiter error", error});
            }
            const {username, email, firstname, lastname, password} = req.body; // Get responce body
            const candidate = await User.findOne({username}); // Check if entered userneme is unique

            if(candidate) {
                return res.status(400).json({message: "This username is already in use"});
            }

            const hashPassword = bycrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, email, firstname, lastname, password: hashPassword, roles: [userRole.value]}) // Create new User
            await user.save();

            return res.json({message: "User reqister success"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Register error'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})

            if(!user) {
                return res.status(400).json({message: `User ${username} not found`});
            }
            const validPassword = bycrypt.compareSync(password, user.password);

            if(!validPassword) {
                return res.status(400).json({message: `Invalid password`});
            }

            const token = generateAccessToken(user._id, user.roles);

            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users); 
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Users error'});
        }
    }
}

module.exports = new authController();