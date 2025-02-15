const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: String,
    email: String,
    img: { type: String, default: "" },
    tokenUser: {
      type: String,
      unique: true,
    },
    img: String,
    address: String,
    password: String,
    phone: String,
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    createdBy: String,
    deletedBy: String,
    updatedBy: [{ user_id: String, updateAt: Date }],
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
User.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("User", User, "users");
