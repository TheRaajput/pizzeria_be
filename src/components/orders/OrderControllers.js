const Orders = require("./OrderModel");
const Inventory = require("../inventory/InventoryModel");
const sendEmail = require("../../configs/email");
const { InventoryMailTemplate } = require("../../configs/email/emailTemplates");
const ObjectId = require("mongodb").ObjectId;
const event = require("events");
const emmitter = new event.EventEmitter();
const getOrderDetails = async (req, res) => {
  try {
    const response = await Orders.find();
    return res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Orders.find({ user_id: id });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};
const createOrder = async (req, res) => {
  try {
    const inventory_deletion = req.body.line_items.map(async (products) => {
      return await Inventory.findOneAndUpdate(
        {
          _id: ObjectId(req.body.inventory_id),
          "products._id": ObjectId(products.product_id),
        },
        {
          $inc: { "products.$.quantity": -products.quantity },
        },
        { arrayFilters: [{ "products.$.quantity": { $gt: 20 } }] }
      );
    });
    if (inventory_deletion) {
      const OrderData = new Orders(req.body);
      const response = await OrderData.save();
      const inventory = await Inventory.findById(
        ObjectId(req.body.inventory_id)
      );
      const InventoryMail = inventory.products.find(
        (items) => items.quantity < 20
      );
      if (InventoryMail) {
        const mailBody = {
          from: "admin@pizzeria.com",
          recipients: "singhyasharth20@gmail.com",
          subject: "Urgent | Regarding updating the inventory.",
          html: InventoryMailTemplate(),
        };
        sendEmail(mailBody);
      }
      return res.status(200).send(response);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const response = await Orders.findOneAndUpdate(
      { _id: req.body.id },
      { status: req.body.status },
      { new: true }
    );
    emmitter.emit("status-update", response.toJSON());
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const getStatus = async (req, res) => {
      const response = await Orders.findById(ObjectId(req.params.id));
      return res.status(200).send(response.status);
    };
    const timeout = setTimeout(() => {
      getStatus(req, res);
    }, 1000 * 60 * 5);
    emmitter.addListener("status-update", (response) => {
      clearTimeout(timeout);
      console.log("Sun liya", response);
      getStatus(req, res);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  getOrderDetails,
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  getOrderStatus,
};
