const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/clients/ProductController");
const locals = require("../../middlewares/client/products/Home.Middleware");
const isSlug = require("../../middlewares/client/categories/IsSlug.Middleware");
router.get("/san-pham-noi-bat", locals.locals, ProductController.showFeatured);
router.get(
  "/:slugCategory",
  isSlug.isSlug,
  locals.locals,
  ProductController.showProduct
);
router.get("/:slug", locals.locals, ProductController.detail);
module.exports = router;
