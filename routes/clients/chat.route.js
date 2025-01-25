const express = require("express");
const router = express.Router();
const ChatController = require("../../controllers/clients/ChatController");
const cartIdMiddleware = require("../../middlewares/client/carts/Cart.Middleware");
const locals = require("../../middlewares/client/products/Home.Middleware");
const user = require("../../middlewares/client/auth/User.Middleware");
const auth = require("../../middlewares/client/auth/Auth.Middleware");

/// Sử dụng middleware cho các đường dẫn thuộc file này
router.use(locals.locals, cartIdMiddleware.cartId);

/// Đường dẫn dẫn đến trang chat hỗ trợ
router.get("/", auth.auth, user.user, ChatController.showChat);
module.exports = router;
