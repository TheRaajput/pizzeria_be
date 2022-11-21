const express = require("express");
const {
  getOrderDetails,
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  getOrderStatus,
} = require("./OrderControllers");
const OrderRouter = express.Router();

OrderRouter.get("/", getOrderDetails);
OrderRouter.get("/:id", getOrderByUserId);
OrderRouter.post("/", createOrder);
OrderRouter.post("/update", updateOrderStatus);
OrderRouter.get("/order-status/:id", getOrderStatus);

module.exports = OrderRouter;
