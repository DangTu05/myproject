const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateAccount");
const upload = multer();
const router = express.Router();
const AccountController = require("../../../controllers/admin/accounts/AccountController");
const emailExist = require("../../../middlewares/admin/exist/EmailExist");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
router.post(
  "/create",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  AccountController.create
);
router.get("/create", AuthMiddleware.requireAuth, AccountController.show);
router.get(
  "/accounts",
  AuthMiddleware.requireAuth,
  AccountController.showAccounts
);
router.get("/edit/:id", AuthMiddleware.requireAuth, AccountController.showEdit);
router.patch(
  "/edit/:id",
  upload.single("img"),
  validate.create,
  emailExist.emailExist,
  uploadCloud.upload,
  AccountController.edit
);
router.delete(
  "/delete/:id",
  AuthMiddleware.requireAuth,
  AccountController.delete
);
module.exports = router;
