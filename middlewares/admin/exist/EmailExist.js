const Accounts = require("../../../models/accounts/account.model");
module.exports.emailExist = async (req, res, next) => {
  try {
    const existingEmail = await Accounts.findOne({
      email: req.body.email,
      _id: { $ne: res.locals.user._id },
      deleted: false,
    });
    if (existingEmail) {
      return res.json({ message: "Email đã tồn tại" });
    }
    next();
  } catch {
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau." });
  }
};
