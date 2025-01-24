const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart = new Schema(
  {
    user_id: { type: String, default: "" },
    cart_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cart", Cart, "carts");
