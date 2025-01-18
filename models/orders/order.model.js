const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const order = new Schema(
  {
    cartId: String,
    userInfo: {
      name: String,
      phone: String,
      address: String,
    },
    products: [{ product_id: String, quantity: Number, price: Number }],
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", order, "orders");
module.exports = Order;
