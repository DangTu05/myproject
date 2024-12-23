const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../../middlewares/validate/admin/ValidateCategory");
const upload = multer();
const router = express.Router();
const CategoryController = require("../../../controllers/admin/category/CategoryController");
router.get("/category/create", CategoryController.show);
router.get("/category", CategoryController.Detail);
router.post(
  "/category/create",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CategoryController.create
);
router.get(
  "/category/edit/:id",
  CategoryController.showEdit
);
router.patch("/category/change-status/:status/:id", CategoryController.ChangeStatus);
module.exports = router;
