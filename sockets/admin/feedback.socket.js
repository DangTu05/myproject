const Feedback = require("../../models/users/feedback.model");
module.exports = async (req, res) => {
  _io.once("connection", async (socket) => {
    /// Admin gửi bình luận
    socket.on("admin_feedback", (data) => {
      data.user_id = "";
      data.product_id = req.params.id;
      const feedback = new Feedback({
        data,
      });
      feedback.save();
      /// server trả về bình luận
      _io.emit("server-return-feedback", () => {
        feedback: data;
        name: "Admin";
      });
    });
  });
};
