const systemConfig = require("../../../configs/system");
const Accounts = require("../../../models/accounts/account.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Accounts.findOne({ token: req.cookies.token });
    if (!user) {
      return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      next();
    }
  }
};
