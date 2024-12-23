const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/uploadCloud.middleware");
const storage = require("../../../helpers/StorageMulti.helper");
const validate = require("../../../middlewares/validate/admin/ValidateProduct");
const upload = multer();
const router = express.Router();
const CreateController = require("../../../controllers/admin/products/CreateController");
router.get("/create", CreateController.show);
router.post(
  "/create",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CreateController.create
);
module.exports = router;
