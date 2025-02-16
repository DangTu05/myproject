const Chat = require("../../../models/chats/chat.model");
const User = require("../../../models/users/user.model");
const chatSocket = require("../../../sockets/admin/chat.socket");
const blockSocket = require("../../../sockets/admin/block.socket");
class ChatController {
  /// Show giao diện nhắn tin theo room_chat_id
  async showChat(req, res, next) {
    blockSocket(next);
    chatSocket(req);
    const room_id = req.params.room_id;
    /// Lấy ra mảng chats theo room_chat_id và sắp xếp theo tăng dần về thời gian tạo
    const chats = await Chat.find({ room_chat_id: room_id }).sort({
      createdAt: 1,
    });
    /// Lấy ra user_id đầu tiên thoản mãn khác user_id = ""
    const user_id = chats.find((item) => item.user_id !== "").user_id;
    const user = await User.findOne({ _id: user_id });
    res.render("./admin/pages/chats/index", {
      chats: chats,
      customer: user,
    });
  }
  /// End show giao diện nhắn tin theo room_chat_id

  /// Xóa tin nhắn
  async deleteChat(req, res, next) {
    const room_chat_id = req.params.room_id;
    try {
      await Chat.updateMany(
        {
          room_chat_id: room_chat_id,
        },
        {
          $addToSet: { deletedBy: res.locals.user._id.toString() },
        }
      );
      res.status(200).json({ message: "Xóa thành công", code: 200 });
    } catch (err) {
      next(err);
    }
  }
  ///End xóa tin nhắn
}
module.exports = new ChatController();
