const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Setting = new Schema(
  {
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    logo: { type: String, default: "" },
    hotline: { type: String, default: "" },
    websiteName: { type: String, default: "" },
    map: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Setting", Setting, "settings");
