const express = require("express");
const router = express.Router();
const Validate = require("../../../middlewares/admin/validate/ValidateAuth");
const AuthController = require("../../../controllers/admin/auth/AuthController");
router.get("/login", AuthController.showLogin);
router.post("/login", Validate.login, AuthController.login);
router.get("/logout", AuthController.logout);
module.exports = router;
