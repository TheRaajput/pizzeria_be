const express = require("express");
const verifyToken = require("../../configs/middlewares");
const {
  createUser,
  authenticateUser,
  getUserInfo,
  getAUserInfo,
  verifyOtp,
  deleteUser,
} = require("./userController");
const UserRouter = express.Router();

UserRouter.get("/", verifyToken, getUserInfo);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/:id", getAUserInfo);
UserRouter.post("/create-user", createUser);
UserRouter.post("/login", authenticateUser);
UserRouter.post("/verify", verifyOtp);

module.exports = UserRouter;
