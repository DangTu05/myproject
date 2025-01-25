const systemConfig = require("../../../configs/system");
const Accounts = require("../../../models/accounts/account.model");
const Roles = require("../../../models/roles/role.models");
const Chat = require("../../../models/chats/chat.model");
const User = require("../../../models/Users/user.model");
const { create } = require("../validate/ValidateProduct");
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
    const chats = await Chat.aggregate([
      {
        $sort: { createdAt: -1 }, // Sắp xếp theo createdAt tăng dần
      },
      {
        $group: {
          _id: "$room_chat_id",
          firstChat: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$firstChat" },
      },
    ]);
    const uniqueUserIds = await Chat.distinct("user_id").sort({ createdAt: 1 });
    const room_id = await Chat.distinct("room_chat_id").sort({ createdAt: 1 });
    const users = await User.find({ _id: { $in: uniqueUserIds } });
    if (!user) {
      return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.users = users;
      res.locals.room_id = room_id;
      res.locals.chats = chats;
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
