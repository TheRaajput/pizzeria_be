const express = require("express");
const InventoryRouter = require("../components/inventory");
const OrderRouter = require("../components/orders");
const UserRouter = require("../components/users");
const verifyToken = require("../configs/middlewares");
const routers = express.Router();

routers.get("/", (req, res) => {
  res.send("pizzeria api");
});

routers.use("/v1/users", UserRouter);
routers.use("/v1/inventory", verifyToken, InventoryRouter);
routers.use("/v1/order", OrderRouter);
module.exports = routers;
