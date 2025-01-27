const Users = require("../../../models/Users/user.model");
const Chat = require("../../../models/chats/chat.model");
module.exports.user = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await Users.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    const chat = await Chat.findOne({ user_id: user._id });
    const chats = await Chat.find({ room_chat_id: chat.room_chat_id });
    let unread_count = 0;
    chats.forEach((item) => {
      if (item.status == false) {
        unread_count++;
      }
    });
    res.locals.unread_count = unread_count;
    res.locals.user = user;
  }
  next();
};
