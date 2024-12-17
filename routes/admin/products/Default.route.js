const express = require("express");
const router = express.Router();
const SiteController = require("../../../controllers/admin/DefaultController");
router.get("/", SiteController.show);
module.exports = router;
