const express = require("express");
const multer = require("multer");
const storage = require("../../../helpers/StorageMulti.helper");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const EditController = require("../../../controllers/admin/products/EditProductController");
const validate = require("../../../middlewares/admin/validate/ValidateProduct");
const upload = multer();
const router = express.Router();
router.get("/edit/:id", EditController.show);
router.patch(
  "/edit/:id",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  EditController.Edit
);
module.exports = router;
