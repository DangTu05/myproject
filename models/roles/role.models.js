const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const Role = new Schema(
  {
    title: String,
    description: { type: String, default: "" },
    permissions: { type: Array, default: [] },
    deleted: { type: Boolean, default: false },
    createdBy: String,
    deletedBy: String,
    updatedBy: [{ user_id: String, updateAt: Date }],
  },
  {
    timestamps: true,
  }
);

Role.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("Role", Role, "roles");
