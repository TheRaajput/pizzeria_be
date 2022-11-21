const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  items: {
    pizza_bases: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost_per: { type: Number, default: 0 },
      },
    ],
    sauces: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost_per: { type: Number, default: 0 },
      },
    ],
    cheese: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost_per: { type: Number, default: 0 },
      },
    ],
    vegs: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost_per: { type: Number, default: 0 },
      },
    ],
    meat: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost_per: { type: Number, default: 0 },
      },
    ],
  },
  products: [
    {
      name: { type: String },
      product_image: { type: String },
      quantity: { type: Number, min: 20 },
    },
  ],
});

module.exports = mongoose.model("inventory", InventorySchema);
