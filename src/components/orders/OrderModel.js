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
    toppings: {
      pizza_bases: [
        {
          _id: { type: String },
          name: { type: String },
          cost_per: { type: Number },
        },
      ],
      sauces: [
        {
          _id: { type: String },
          name: { type: String },
          cost_per: { type: Number },
        },
      ],
      cheese: [
        {
          _id: { type: String },
          name: { type: String },
          cost_per: { type: Number },
        },
      ],
      vegs: [
        {
          _id: { type: String },
          name: { type: String },
          cost_per: { type: Number },
        },
      ],
      meat: [
        {
          _id: { type: String },
          name: { type: String },
          cost_per: { type: Number },
        },
      ],
    },
    status: { type: String, default: "pending" },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
