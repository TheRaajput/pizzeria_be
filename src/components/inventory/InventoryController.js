const { INVENTORY_ID } = require("../../configs/constants");
const Inventory = require("./InventoryModel");
const ObjectId = require("mongodb").ObjectId;

const getInventory = async (req, res) => {
  try {
    const response = await Inventory.find();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const updateInventory = async (req, res) => {
  try {
    const response = await Inventory.findByIdAndUpdate(
      ObjectId(INVENTORY_ID),
      req.body
    );
    return res.status(201).send({ message: "Inventory Updated" });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { getInventory, updateInventory };
