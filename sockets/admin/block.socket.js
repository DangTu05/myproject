const User = require("../../models/users/user.model");
module.exports = (next) => {
  _io.once("connection", async (socket) => {
    /// Nhận sự kiện chặn tin nhắn
    socket.on("block", async (data) => {
      try {
        await User.findByIdAndUpdate(data.data, {
          $set: { isBlocked: true },
        });
        _io.emit("server-return-block", "Đã chặn thành công");
      } catch (error) {
        next(error);
      }
    });
  });
};
