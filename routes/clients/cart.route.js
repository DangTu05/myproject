const express = require("express");
const router = express.Router();
const cartIdMiddleware = require("../../middlewares/client/carts/Cart.Middleware");
const CartController = require("../../controllers/clients/CartController");
router.post("/add/:productId", cartIdMiddleware.cartId, CartController.add);
module.exports = router;
