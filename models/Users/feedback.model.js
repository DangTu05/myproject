const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const Feedback = new Schema(
  {
    user_id: String,
    content: String,
    deleted: { type: Boolean, default: false },
    product_id: String,
    status: { type: Boolean, default: false },
    product_id: String,
  },
  {
    timestamps: true,
  }
);
Feedback.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("Feedback", Feedback, "feedbacks");
