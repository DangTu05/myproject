const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const Chat = new Schema(
  {
    user_id: { type: String, default: "" },
    img: Array,
    content: String,
    room_chat_id: String,
    status: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    deletedBy: [String],
  },
  {
    timestamps: true,
  }
);
Chat.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model("Chat", Chat, "chats");
