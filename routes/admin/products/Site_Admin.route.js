const express = require("express");
const router = express.Router();
const SiteController = require("../../../controllers/admin/products/index");
router.get("/", SiteController.show);
module.exports = router;