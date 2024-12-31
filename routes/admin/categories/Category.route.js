const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateCategory");
const upload = multer();
const router = express.Router();
const CategoryController = require("../../../controllers/admin/category/CategoryController");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
/// show giao diện tạo danh mục sản phẩm
router.get(
  "/category/create",
  AuthMiddleware.requireAuth,
  CategoryController.show
);
/// show giao diện chi tiết danh mục sản phẩm
router.get("/category", AuthMiddleware.requireAuth, CategoryController.Detail);
/// xử lý tạo danh mục sản phẩm
router.post(
  "/category/create",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CategoryController.create
);
/// show giao diện chỉnh sửa danh mục sản phẩm
router.get(
  "/category/edit/:id",
  AuthMiddleware.requireAuth,
  CategoryController.showEdit
);
/// sửa danh mục sản phẩm
router.patch(
  "/category/edit/:id",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  CategoryController.Edit
);
/// Xử lý chỉnh sửa nhiều status danh mục sản phẩm
router.patch(
  "/category/change-status/:status/",
  AuthMiddleware.requireAuth,
  CategoryController.ChangeMultiStatus
);
/// xử lý chỉnh sửa status danh mục sản phẩm
router.patch(
  "/category/change-status/:status/:id",
  AuthMiddleware.requireAuth,
  CategoryController.ChangeStatus
);
/// xử lý xóa mềm danh mục sản phẩm
router.delete(
  "/category/delete/:id",
  AuthMiddleware.requireAuth,
  CategoryController.Delete
);
/// Xử lý xóa nhiều danh mục sản phẩm
router.delete(
  "/category/delete-multi",
  AuthMiddleware.requireAuth,
  CategoryController.DeleteMulti
);

module.exports = router;
