const express = require("express");
const router = express.Router();
const SiteController = require("../../controllers/clients/SiteController");
const user = require("../../middlewares/client/auth/User.Middleware");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.get("/", locals.locals, user.user, SiteController.show);
module.exports = router;
