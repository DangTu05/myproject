const Chat = require("../../models/chats/chat.model");
module.exports = (res) => {
  const user_id = res.locals.user.id;
  _io.once("connection", async (socket) => {
    socket.on("client-send-message", async (data) => {
      const chat = new Chat({
        user_id: user_id,
        content: data,
      });
      await chat.save();
      /// SEVER_RETURN__MESSAGE
      _io.emit("server-return-message", {
        user_id: user_id,
        content: data,
        name: res.locals.user.name,
      });
      /// END_SEVER_RETURN__MESSAGE
    });
    /// Typing
    socket.on("client-typing", (data) => {
      socket.broadcast.emit("server-return-typing", {
        user_id: user_id,
        name: res.locals.user.name,
        type: data,
      });
    });
    /// End Typing
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
