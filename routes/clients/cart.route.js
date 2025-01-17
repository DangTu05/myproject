const express = require("express");
const router = express.Router();
const CartController = require("../../controllers/clients/CartController");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.post("/add/:productId", CartController.add);
router.get("/delete/:productId", CartController.remove);
router.get("/", locals.locals, CartController.index);
module.exports = router;
