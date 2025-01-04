const express = require("express");
const router = express.Router();
const DetailMiddleware = require("../../middlewares/client/products/Detail.middleware");
const ProductController = require("../../controllers/clients/ProductController");
router.get("/:slug", DetailMiddleware.data, ProductController.Detail);
module.exports = router;
