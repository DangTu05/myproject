const express = require("express");
const router = express.Router();
const Detail = require("../../../controllers/admin/products/DetailController");
router.get("/Products/:id", Detail.show);
module.exports = router;
