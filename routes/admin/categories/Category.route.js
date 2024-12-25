const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../../middlewares/validate/admin/ValidateCategory");
const upload = multer();
const router = express.Router();
const CategoryController = require("../../../controllers/admin/category/CategoryController");

/// show giao diện tạo danh mục sản phẩm
router.get("/category/create", CategoryController.show);
/// show giao diện chi tiết danh mục sản phẩm
router.get("/category", CategoryController.Detail);
/// xử lý tạo danh mục sản phẩm
router.post(
  "/category/create",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CategoryController.create
);
/// show giao diện chỉnh sửa danh mục sản phẩm
router.get(
  "/category/edit/:id",
  CategoryController.showEdit
);
/// sửa danh mục sản phẩm
router.patch(
  "/category/edit/:id",
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CategoryController.Edit
);
/// Xử lý chỉnh sửa nhiều status danh mục sản phẩm
router.patch("/category/change-status/:status/", CategoryController.ChangeMultiStatus);
/// xử lý chỉnh sửa status danh mục sản phẩm
router.patch("/category/change-status/:status/:id", CategoryController.ChangeStatus);
/// xử lý xóa mềm danh mục sản phẩm
router.delete("/category/delete/:id", CategoryController.Delete);
/// Xử lý xóa nhiều danh mục sản phẩm
router.delete("/category/delete-multi", CategoryController.DeleteMulti);

module.exports = router;
