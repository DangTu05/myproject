const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/clients/ProductController");
const locals = require("../../middlewares/client/products/Home.Middleware");
const user = require("../../middlewares/client/auth/User.Middleware");
const isSlug = require("../../middlewares/client/categories/IsSlug.Middleware");

/// Sử dụng middleware cho toàn đường dẫn của file này
router.use(user.user);

/// Đường dẫn dẫn đến trang danh sách sản phẩm nổi bật
router.get("/san-pham-noi-bat", locals.locals, ProductController.showFeatured);

/// Đường dẫn dẫn đến trang danh sách sản phẩm theo danh mục
router.get(
  "/:slugCategory",
  locals.locals,
  isSlug.isSlug,
  ProductController.showProduct
);

/// Đường dẫn dẫn đến trang chi tiết sản phẩm
router.get("/:slug", locals.locals, ProductController.detail);

/// Đường dẫn gửi feedback về sản phẩm
router.post("/:slug", ProductController.feedback);
module.exports = router;
