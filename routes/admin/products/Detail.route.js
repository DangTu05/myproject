const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const Detail = require("../../../controllers/admin/products/DetailController");
router.get("/Products/:id", AuthMiddleware.requireAuth, Detail.show);
module.exports = router;
