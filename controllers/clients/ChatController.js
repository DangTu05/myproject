const Chat = require("../../models/chats/chat.model");
const User = require("../../models/Users/user.model");
const chatSocket=require("../../sockets/client/chat.socket");
class ChatController {
  async showChat(req, res) {
    chatSocket(res);
    const chats = await Chat.find({});
    for (const chat of chats) {
      const user = await User.findOne({
        deleted: false,
        _id: chat.user_id,
        status: "active",
      }).select("name");
      chat.user_name = user.name;
    }
    res.render("./clients/pages/chat/index", {
      chats: chats,
    });
  }
}
module.exports = new ChatController();
