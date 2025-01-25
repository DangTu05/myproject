const express = require("express");
const router = express.Router();
const CheckoutController = require("../../controllers/clients/CheckoutController");
const locals = require("../../middlewares/client/products/Home.Middleware");
const user = require("../../middlewares/client/auth/User.Middleware");

/// Sử dụng middleware cho toàn đường dẫn của file này
router.use(user.user, locals.locals);

/// Thêm thông tin nhận hàng
router.post("/address/create", CheckoutController.createInfo);

/// Sửa thông tin nhận hàng
router.patch("/address/edit/:id", CheckoutController.editInfo);

/// Xóa thông tin nhận hàng
router.get("/address/delete/:id", CheckoutController.deleteInfo);

/// Đường dẫn dẫn đến trang checkout
router.get("/", CheckoutController.index);
module.exports = router;
