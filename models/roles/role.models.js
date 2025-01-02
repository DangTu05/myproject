const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const Role = new Schema(
  {
    title: String,
    description: String,
    permissions: {type:Array,default:[]},
    deleted: { type: Boolean, default: false },
    createdBy:String,
    deletedBy:String,
  },
  {
    timestamps: true,
  }
);

Role.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("Role", Role, "roles");
