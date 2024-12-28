const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const generateToken = require("../../helpers/accounts/generate.helper");
const Schema = mongoose.Schema;
const Account = new Schema(
  {
    name: String,
    email: String,
    img: String,
    token: {
      type: String,
      default: generateToken(20),
    },
    password: String,
    phone: String,
    role_id: String,
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
Account.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("accounts", Account, "accounts");
