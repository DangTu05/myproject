const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const Account = new Schema(
  {
    name: String,
    email: String,
    img: { type:String, default:"" },
    token: {
      type: String,
      unique: true,
    },
    password: String,
    phone: String,
    role_id: String,
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    createdBy: String,
    deletedBy: String,
    updatedBy: [{ user_id: String, updateAt: Date }],
  },
  {
    timestamps: true,
  }
);
Account.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("accounts", Account, "accounts");
