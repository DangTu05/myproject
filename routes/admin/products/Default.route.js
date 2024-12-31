const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const SiteController = require("../../../controllers/admin/DefaultController");
router.get("/", AuthMiddleware.requireAuth, SiteController.show);
module.exports = router;
