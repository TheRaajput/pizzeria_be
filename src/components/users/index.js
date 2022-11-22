const express = require("express");
const verifyToken = require("../../configs/middlewares");
const {
  createUser,
  authenticateUser,
  getUserInfo,
  getAUserInfo,
  verifyOtp,
  deleteUser,
  forgotPassword,
  forgotpassOtpVerification,
  changePassword,
} = require("./UserController");

const UserRouter = express.Router();

UserRouter.get("/", verifyToken, getUserInfo);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/:id", getAUserInfo);
UserRouter.post("/create-user", createUser);
UserRouter.post("/login", authenticateUser);
UserRouter.post("/verify", verifyOtp);
UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/otp-verification", forgotpassOtpVerification);
UserRouter.post("/change-password", changePassword);

module.exports = UserRouter;
