const Chat = require("../../../models/chats/chat.model");
const User = require("../../../models/Users/user.model");
class ChatController {
  async showChat(req, res) {
    const room_id = req.params.room_id;
    const chats = await Chat.find({ room_chat_id: room_id }).sort({
      createdAt: 1,
    });
    const user_id = chats.find((item) => item.user_id !== "").user_id;
    console.log(user_id);
    
    const user = await User.findOne({ _id: user_id });
    console.log(user);
    
    res.render("./admin/pages/chats/index", {
      chats: chats,
      user: user,
    });
  }
}
module.exports = new ChatController();
