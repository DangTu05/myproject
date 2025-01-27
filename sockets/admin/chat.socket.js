const Chat = require("../../models/chats/chat.model");
module.exports = async (req) => {
  _io.once("connection", async (socket) => {
    /// Nhận sự kiện admin seen tin nhắn
    socket.on("admin_seen_message", async () => {
      /// Tìm ra các bản ghi theo room_chat_id
      const chats = await Chat.find({ room_chat_id: req.params.room_id });
      for (const chat of chats) {
        /// Nếu user_id khác "" thì chuyển trạng thái đó thành true (đã xem)
        if (chat.status == false && chat.user_id != "") {
          chat.status = true;
          chat.save();
        }
      }
    });
    // cách 2
    // await Chat.updateMany(
    //   { room_chat_id: req.params.room_id, status: false },
    //   { $set: { status: true } }
    // );

    socket.on("admin-send-message", async (data) => {
      const chat = new Chat({
        // user_id: "",
        content: data,
        room_chat_id: req.params.room_id,
      });
      await chat.save();
      /// SEVER_RETURN__MESSAGE
      _io.emit("server-return-message", {
        user_id: "",
        content: data,
        name: "Admin",
      });
      /// END_SEVER_RETURN__MESSAGE
    });
    /// Typing
    socket.on("client-typing", (data) => {
      socket.broadcast.emit("server-return-typing", {
        user_id: "",
        name: "Admin",
        type: data,
      });
    });
    /// End Typing
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
