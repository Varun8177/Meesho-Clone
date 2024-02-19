const UserServices = require("../services/user.service");

const UserController = {
  getUser: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const user = await UserServices.getUserService(userId);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
  getCurrentOnlineUser: async (req, res, next) => {
    const userId = req.body.user;
    try {
      const user = await UserServices.getCurrentUser(userId);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
  updateCurrentOnlineUser: async (req, res, next) => {
    const userId = req.body.user;
    const changes = req.body.changes;
    try {
      const user = await UserServices.updateCurrentUser(userId, changes);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req, res, next) => {
    const registrationDetails = req.body;
    try {
      const newUser = await UserServices.registerUserService(
        registrationDetails
      );
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    const loginDetails = req.body;
    try {
      const message = await UserServices.loginUserService(loginDetails);
      res.status(200).json({
        message: message,
      });
    } catch (error) {
      next(error);
    }
  },
  mobileVerify: async (req, res, next) => {
    // otpFromUser, mobile, use
    const { otp, mobile } = req.body;
    const usecase = req.params.usecase;
    try {
      const user = await UserServices.verifyotp(otp, mobile, usecase);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
