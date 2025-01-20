const Users = require("../../../models/Users/user.model");
module.exports.user = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await Users.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    res.locals.user = user;
  }
  next();
};
