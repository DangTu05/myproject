const Users = require("../../../models/Users/user.model");
module.exports.auth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    return res.redirect("/user/login");
  } else {
    next();
  }
};
