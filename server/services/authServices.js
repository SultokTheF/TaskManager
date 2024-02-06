const ApiError = require("../exeptions/api-errors");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const Token = require("../models/Token");

const TokenServices = require("./tokenServices");
const tokenServices = require("./tokenServices");

class AuthServices {
  async registration(username, email, firstname, lastname, password){
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw ApiError.BadRequest('The username is already in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 3);
    const userRole = await Role.findOne({ value: "USER" });
    
    const newUser = new User({
      username,
      email,
      firstname,
      lastname,
      password: hashPassword,
      roles: [userRole.value],
      profile_image: Math.floor(Math.random() * 9) + 1,
    });

    await newUser.save();

    return newUser
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if(!user) {
      throw ApiError.BadRequest(`User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw ApiError.BadRequest(`Invalid password`);
    }

    const tokens = TokenServices.generateTokens(user);
    await TokenServices.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens
    };
  }

  async logout(refreshToken) {
    const token = await tokenServices.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenServices.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenServices.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.user.id);

    const tokens = TokenServices.generateTokens(user);

    await TokenServices.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens
    };
  }
}

module.exports = new AuthServices();