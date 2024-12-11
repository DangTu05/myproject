const express = require("express");
const router = express.Router();
const SiteController = require("../../controllers/clients/SiteController");
router.get("/", SiteController.show);
module.exports = router;
