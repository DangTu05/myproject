const Users = require("../../models/Users/user.model");
module.exports.auth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    return res.redirect("/user/register");
  } else {
    const user = await Users.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    if (!user) {
      res.clearCookie("tokenUser");
      return res.redirect("/user/register");
    }
    res.locals.user = user;
    next();
  }
};
