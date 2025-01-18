const express = require("express");
const router = express.Router();
const CheckoutController = require("../../controllers/clients/CheckoutController");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.use(locals.locals);
router.post("/address/create", CheckoutController.createInfo);
router.patch("/address/edit/:id", CheckoutController.editInfo);
router.get("/", CheckoutController.index);
module.exports = router;
