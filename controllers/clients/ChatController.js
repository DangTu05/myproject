const Chat = require("../../models/chats/chat.model");
const User = require("../../models/users/user.model");
const chatSocket = require("../../sockets/client/chat.socket");
class ChatController {
  async showChat(req, res) {
    chatSocket(res);
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    });
    const chat = await Chat.findOne({
      user_id: user._id
    });

    if (chat) {
      const chats = await Chat.find({
        room_chat_id: chat.room_chat_id,
      });
      // const sender = chats.find(
      //   (item) => item.user_id != req.cookies.tokenUser
      // );
      // const user_sender = await User.findOne({
      //   deleted: false,
      //   _id: sender.user_id,
      // }).select("name");
      res.render("./clients/pages/chat/index", {
        chats: chats,
        // sender: user_sender.name,
      });
    } else {
      res.render("./clients/pages/chat/index", {});
    }
  }
}
module.exports = new ChatController();
