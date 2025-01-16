const express = require("express");
const router = express.Router();
const SiteController = require("../../controllers/clients/SiteController");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.get("/",locals.locals, SiteController.show);
module.exports = router;
