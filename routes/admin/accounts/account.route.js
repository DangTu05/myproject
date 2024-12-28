const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateAccount");
const upload = multer();
const router = express.Router();
const AccountController = require("../../../controllers/admin/accounts/AccountController");
router.post(
  "/register",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  AccountController.create
);
router.get("/register", AccountController.show);
module.exports = router;
