const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    name: { type: String },
    contact_number: { type: String },
    email: { type: String },
    inventory_id: { type: String },
    is_custom: { type: Boolean, default: false },
    line_items: [
      {
        product_id: { type: String },
        name: { type: String },
        quantity: { type: Number },
      },
    ],
    toppings: [
      {
        product_id: { type: String },
        name: { type: String },
        category: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    status: { type: String, default: "pending" },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
