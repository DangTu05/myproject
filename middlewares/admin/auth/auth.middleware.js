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
        $sort: { createdAt: -1 }, // Sắp xếp theo createdAt giảm dần
      },
      {
        ///Nhóm các tài liệu theo trường room_chat_id
        $group: {
          // Sử dụng giá trị của trường room_chat_id làm _id của nhóm
          _id: "$room_chat_id",
          // Lấy tài liệu đầu tiên trong mỗi nhóm và gán nó cho trường firstChat
          firstChat: { $first: "$$ROOT" },
        },
      },
      {
        // Thay thế gốc của tài liệu bằng tài liệu đầu tiên trong mỗi nhóm (firstChat).
        $replaceRoot: { newRoot: "$firstChat" },
      },
    ]).sort({ createdAt: -1 });
    const uniqueUserIds = chats.map((item) => item.user_id);
    console.log(uniqueUserIds);

    const room_id = chats.map((item) => item.room_chat_id);
    const customers_array = await User.find({ _id: { $in: uniqueUserIds } });
    const customers = uniqueUserIds.map((id) =>
      customers_array.find((customer) => customer._id.toString() === id)
    );

    if (!user) {
      return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.customers = customers;
      res.locals.room_id = room_id;
      res.locals.chats = chats;
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
