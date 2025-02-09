const systemConfig = require("../../../configs/system");
const Accounts = require("../../../models/accounts/account.model");
const Roles = require("../../../models/roles/role.models");
const Chat = require("../../../models/chats/chat.model");
const User = require("../../../models/users/user.model");
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
    /// Mảng chứa các tin nhắn cuối cùng của mỗi đoạn tin nhắn và sắp xếp giảm dần theo thời gian nhắn
    const chats = await Chat.aggregate([
      {
        $sort: { createdAt: -1 }, // Sắp xếp theo createdAt giảm dần
      },
      {
        $match: { user_id: { $ne: "" } }, // Loại bỏ các tài liệu có user_id là chuỗi rỗng
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
    /// check xem có bao nhiêu tin nhắn có trạng thái là false(chưa xem)
    let unread_count = 0;
    chats.forEach((item) => {
      if (item.status == false) {
        unread_count++;
      }
    });
    /// Mảng chứa các các user_id có trong mảng chats
    const uniqueUserIds = chats
      .map((item) => item.user_id)
      .filter((id) => id !== "");
    /// Mảng chứa các room_id có trong mảng chats
    const room_id = chats.map((item) => item.room_chat_id);
    /// Lấy ra các thông tin user có id nằm trong mảng uniqueUserIds nhưng ko theo thứ tự
    const customers_array = await User.find({ _id: { $in: uniqueUserIds } });
    /// Sắp xếp lại thông tin user theo đúng thứ tự id của mảng uniqueUserIds
    const customers = uniqueUserIds.map((id) =>
      customers_array.find((customer) => customer._id.toString() === id)
    );
    /// Kiểm tra xem user có tồn tại không nếu không đẩy về trang login
    if (!user) {
      return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.unread_count = unread_count;
      res.locals.customers = customers;
      res.locals.room_id = room_id;
      res.locals.chats = chats;
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
