const express = require("express");
const { getInventory, updateInventory } = require("./InventoryController");
const InventoryRouter = express.Router();

InventoryRouter.get("", getInventory);
InventoryRouter.post("/", updateInventory);

module.exports = InventoryRouter;
