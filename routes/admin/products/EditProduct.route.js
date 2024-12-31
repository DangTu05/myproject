const express = require("express");
const multer = require("multer");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const storage = require("../../../helpers/StorageMulti.helper");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const EditController = require("../../../controllers/admin/products/EditProductController");
const validate = require("../../../middlewares/admin/validate/ValidateProduct");
const upload = multer();
const router = express.Router();
router.get("/edit/:id", AuthMiddleware.requireAuth, EditController.show);
router.patch(
  "/edit/:id",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  EditController.Edit
);
module.exports = router;
