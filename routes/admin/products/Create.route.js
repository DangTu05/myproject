const express = require("express");
const multer = require("multer");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateProduct");
const upload = multer();
const router = express.Router();
const CreateController = require("../../../controllers/admin/products/CreateController");
router.get("/create", AuthMiddleware.requireAuth, CreateController.show);
router.post(
  "/create",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CreateController.create
);
module.exports = router;
