const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");
const User = require("../models/User");
const Role = require("../models/Role");

const AuthServices = require("../services/authServices");
const ApiError = require("../exeptions/api-errors");

class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return next(ApiError.BadRequest(('Validation error'), errors.array()))
      }

      const {username, email, firstname, lastname, password} = req.body;
      const userData = await AuthServices.registration(username, email, firstname, lastname, password);
      return res.json(userData);
    } catch (error){
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await AuthServices.login(username, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await AuthServices.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch(error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await AuthServices.refresh(refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
