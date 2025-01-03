const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const MyAccoutController = require("../../../controllers/admin/my-account/IndexController");
router.get("/",AuthMiddleware.requireAuth, MyAccoutController.index);
module.exports = router;
