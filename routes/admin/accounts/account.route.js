const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../../middlewares/admin/upload/uploadCloud");
const validate = require("../../../middlewares/admin/validate/ValidateAccount");
const upload = multer();
const router = express.Router();
const AccountController = require("../../../controllers/admin/accounts/AccountController");
const emailExist = require("../../../middlewares/admin/exist/EmailExist");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const CustomerController = require("../../../controllers/admin/CustomerController");
router.post(
  "/create",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  uploadCloud.upload,
  AccountController.create
);
router.get("/create", AuthMiddleware.requireAuth, AccountController.show);
router.get(
  "/accounts",
  AuthMiddleware.requireAuth,
  AccountController.showAccounts
);
router.get("/edit/:id", AuthMiddleware.requireAuth, AccountController.showEdit);
router.patch(
  "/edit/:id",
  AuthMiddleware.requireAuth,
  upload.single("img"),
  validate.create,
  emailExist.emailExist,
  uploadCloud.upload,
  AccountController.edit
);
router.delete(
  "/delete/:id",
  AuthMiddleware.requireAuth,
  AccountController.delete
);
router.get("/customers", AuthMiddleware.requireAuth, CustomerController.show);
router.get(
  "/customer/:id",
  AuthMiddleware.requireAuth,
  CustomerController.showDetail
);
router.patch(
  "/customers/change-status/:status/:id",
  AuthMiddleware.requireAuth,
  CustomerController.changeStatus
);
router.patch(
  "/customer/edit/:id",
  // AuthMiddleware.requireAuth,
  CustomerController.editInfo
);
router.delete(
  "/customer/delete/:id",
  AuthMiddleware.requireAuth,
  CustomerController.delete
);
module.exports = router;
