const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/clients/UserController");
const validate = require("../../middlewares/client/validate/ValidateLogin");
const auth = require("../../middlewares/client/auth/Auth.Middleware");
const locals = require("../../middlewares/client/products/Home.Middleware");

router.get("/register", UserController.showRegister);
router.post("/register", UserController.register);
router.get("/login", UserController.showLogin);
router.post("/login", validate.login, UserController.login);
router.get("/logout", UserController.logout);
router.get("/profile", locals.locals, auth.auth, UserController.profile);
module.exports = router;
