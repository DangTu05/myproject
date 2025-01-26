const Chat = require("../../models/chats/chat.model");
module.exports = async (req) => {
  _io.once("connection", async (socket) => {
    socket.on("admin-send-message", async (data) => {
      const chat = new Chat({
        // user_id: "",
        content: data,
        room_chat_id: req.params.room_id,
      });
      await chat.save();
      /// SEVER_RETURN__MESSAGE
      _io.emit("server-return-message", {
        // user_id: "",
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
