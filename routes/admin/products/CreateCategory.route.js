const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../../middlewares/validate/admin/ValidateCategory");
const upload = multer();
const router = express.Router();
const CreateController = require("../../../controllers/admin/products/CategoryController");
router.get("/category/create", CreateController.show);
router.post(
  "/category/create",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CreateController.create
);
module.exports = router;
