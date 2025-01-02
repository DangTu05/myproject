const systemConfig = require("../../../configs/system");
const Accounts = require("../../../models/accounts/account.model");
const Roles = require("../../../models/roles/role.models");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Accounts.findOne({ token: req.cookies.token }).select(
      "-password"
    );
    const role = await Roles.findOne({ _id: user.role_id }).select(
      "title permissions"
    );        
    if (!user) {
      return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
