const Feedback = require("../../models/users/feedback.model");
const User = require("../../models/users/user.model");
const Products = require("../../models/products/products");
// eslint-disable-next-line no-unused-vars
module.exports = async (req, res) => {
  _io.once("connection", async (socket) => {
    socket.on("client_feedback", async (data) => {
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
      });
      const product_id = await Products.findOne({
        slug: req.params.slug,
      });
      const feedback = new Feedback({
        user_id: user._id,
        content: data,
        product_id: product_id._id,
      });
      feedback.save();
      _io.emit("client_return_feedback", {
        feedback: data,
        name: user.name,
        img: user.img,
      });
    });
  });
};
