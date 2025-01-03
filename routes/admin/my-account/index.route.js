const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateAccount");
const upload = multer();
const router = express.Router();
const emailExist = require("../../../middlewares/admin/exist/EmailExist");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const MyAccoutController = require("../../../controllers/admin/my-account/IndexController");
router.get("/", AuthMiddleware.requireAuth, MyAccoutController.index);
router.get("/edit", AuthMiddleware.requireAuth, MyAccoutController.showEdit);
router.patch(
  "/edit",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  emailExist.emailExist,
  uploadCloud.upload,
  MyAccoutController.edit
);
module.exports = router;
