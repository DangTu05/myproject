const express = require("express");
const router = express.Router();
const SiteController = require("../../controllers/clients/SiteController");
const auth = require("../../middlewares/client/auth/Auth.Middleware");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.get("/", locals.locals, auth.auth, SiteController.show);
module.exports = router;
