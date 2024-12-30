const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateAccount");
const upload = multer();
const router = express.Router();
const AccountController = require("../../../controllers/admin/accounts/AccountController");
const emailExist=require("../../../middlewares/admin/exist/EmailExist");
router.post(
  "/register",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  AccountController.create
);
router.get("/register", AccountController.show);
router.get("/accounts", AccountController.showAccounts);
router.get("/edit/:id", AccountController.showEdit);
router.patch(
  "/edit/:id",
  upload.single("img"),
  validate.create,
  emailExist.emailExist,
  uploadCloud.upload,
  AccountController.edit
);
router.delete("/delete/:id", AccountController.delete);
module.exports = router;
