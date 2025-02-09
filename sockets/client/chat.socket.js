const Chat = require("../../models/chats/chat.model");
const GenerateOtp = require("../../helpers/client/GenerateOtp.helper");
module.exports = async (res) => {
  /// Lấy ra user_id của tài khoản client đăng nhập
  const user_id = res.locals.user.id;
  /// Kiểm tra xem tài khoản đó có đoạn chat nào chưa
  const isUser = await Chat.findOne({ user_id: user_id });
  _io.once("connection", async (socket) => {
    /// Nhận sự kiện seen tin nhắn phía client
    socket.on("client_seen_message", async () => {
      /// Lấy ra các bản ghi theo room_chat_id
      const chats = await Chat.find({ room_chat_id: isUser.room_chat_id });
      for (const chat of chats) {
        /// Kiểm tra nếu bản chat đấy có user_id khác với user_id của bản thân thì chuyển thành trạng thái true(đã xem)
        if (chat.status == false && chat.user_id != user_id) {
          chat.status = true;
          chat.save();
        }
      }
    });

    /// Nhận data từ sự kiện "client-send-message"
    socket.on("client-send-message", async (data) => {
      /// Nếu user đấy có đoạn chat rồi thì tạo thêm document lưu nội dung đoạn chat user đó vừa gửi lên
      if (isUser) {
        const chat = new Chat({
          user_id: user_id,
          content: data,
          room_chat_id: isUser.room_chat_id,
        });
        await chat.save();
      }
      /// Nếu chưa thì tạo đoạn chat mới với room_chat_id được random
      else {
        const chat = new Chat({
          user_id: user_id,
          content: data,
          room_chat_id: GenerateOtp(10),
        });
        await chat.save();
      }
      /// SEVER_RETURN__MESSAGE
      _io.emit("server-return-message", {
        user_id: user_id,
        content: data,
        name: res.locals.user.name,
      });
      /// END_SEVER_RETURN__MESSAGE
    });
    /// Typing
    /// Nhận data từ sự kiện "client-typing"
    socket.on("client-typing", (data) => {
      /// Trả data đó cho sự kiện "server-return-typing"
      socket.broadcast.emit("server-return-typing", {
        user_id: user_id,
        name: res.locals.user.name,
        type: data,
      });
    });
    /// End Typing
    socket.on("disconnect", () => {
      // eslint-disable-next-line no-console
      console.log("user disconnected");
    });
  });
};
