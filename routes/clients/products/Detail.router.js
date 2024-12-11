const express = require("express");
const router = express.Router();
const Detail = require("../../../controllers/clients/products/DetailController");
router.get("/:slug", Detail.show);
module.exports = router;
