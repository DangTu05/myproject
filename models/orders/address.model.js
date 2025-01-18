const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const address = new Schema(
  {
    cartId: String,
    info: [{ phone: String, name: String, address: String }],
  },
  { timestamps: true }
);
const Address = mongoose.model("Address", address, "address");
module.exports = Address;
