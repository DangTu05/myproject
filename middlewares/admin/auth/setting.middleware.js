const Setting = require("../../../models/accounts/setting.model");
module.exports.setting = async (req, res, next) => {
  const setting = await Setting.findOne({});
  if (setting) {
    res.locals.setting = setting;
    next();
  } else {
    next();
  }
};
