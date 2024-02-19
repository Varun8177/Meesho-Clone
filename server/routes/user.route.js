const express = require("express");
const UserController = require("../controllers/user.controller");
const EnsureAuth = require("../middlewares/Auth.middleware");
const router = express.Router();
const path = "/users";

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/user-details/:userId", EnsureAuth, UserController.getUser);
router.post("/mobile-verify/:usecase", UserController.mobileVerify);
router.get("/me", EnsureAuth, UserController.getCurrentOnlineUser);
router.patch("/me", EnsureAuth, UserController.updateCurrentOnlineUser);

module.exports = { path, router };
