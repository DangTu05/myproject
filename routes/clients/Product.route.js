const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/clients/ProductController");
const locals = require("../../middlewares/client/products/Home.Middleware");
const isSlug = require("../../middlewares/client/categories/IsSlug.Middleware");
router.get("/san-pham-noi-bat",locals.locals, ProductController.showFeatured);
router.get("/:slugCategory",locals.locals, isSlug.isSlug, ProductController.showProduct);
router.get("/:slug",locals.locals, ProductController.detail);
router.post("/:slug", ProductController.feedback);
module.exports = router;
