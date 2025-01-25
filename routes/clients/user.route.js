const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload/uploadCloud");
const upload = multer();
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
router.get(
  "/edit-personal-info",
  locals.locals,
  auth.auth,
  UserController.showEditPersonalInfo
);
router.patch(
  "/edit-personal-info",
  locals.locals,
  auth.auth,
  upload.single("img"),
  uploadCloud.upload,
  UserController.editPersonalInfo
);
router.get("/forgot-password", UserController.showForgotPassword);
router.post("/forgot-password", UserController.forgotPassword);
router.get("/otp-password", UserController.showOTPPassword);
router.post("/otp-password", UserController.otpPassword);
router.get("/change-password", UserController.showChangePassword);
router.post("/change-password", UserController.changePassword);
module.exports = router;
