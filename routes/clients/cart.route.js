const express = require("express");
const router = express.Router();
const CartController = require("../../controllers/clients/CartController");
const locals = require("../../middlewares/client/products/Home.Middleware");

/// Thêm sản phẩm vào giỏ hàng
router.post("/add/:productId", CartController.add);

/// Xóa sản phẩm trong giỏ hàng
router.get("/delete/:productId", CartController.remove);

/// Giao diện giỏ hàng
router.get("/", locals.locals, CartController.index);
module.exports = router;
