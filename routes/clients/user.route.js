const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload/uploadCloud");
const upload = multer();
const UserController = require("../../controllers/clients/UserController");
const validate = require("../../middlewares/client/validate/ValidateLogin");
const auth = require("../../middlewares/client/auth/Auth.Middleware");
const locals = require("../../middlewares/client/products/Home.Middleware");

/// Đường dẫn dẫn đến trang đăng kí tài khoản client
router.get("/register", UserController.showRegister);

/// Thực hiện đăng kí
router.post("/register", UserController.register);

/// Đường dẫn dẫn đến trang đăng nhập tài khoản client
router.get("/login", UserController.showLogin);

/// Thực hiện đăng nhập
router.post("/login", validate.login, UserController.login);

/// Đăng xuất
router.get("/logout", UserController.logout);

/// Đường dẫn dẫn đến trang thông tin tài khoản
router.get("/profile", locals.locals, auth.auth, UserController.profile);

/// Đường dẫn dẫn đến trang sửa thông tin tài khoản
router.get(
  "/edit-personal-info",
  locals.locals,
  auth.auth,
  UserController.showEditPersonalInfo
);

/// Thực hiện sửa thông tin tài khoản
router.patch(
  "/edit-personal-info",
  locals.locals,
  auth.auth,
  upload.single("img"),
  uploadCloud.upload,
  UserController.editPersonalInfo
);

/// Đường dẫn dẫn đến trang quên mật khẩu
router.get("/forgot-password", UserController.showForgotPassword);

/// Thực hiện quên mật khẩu
router.post("/forgot-password", UserController.forgotPassword);

/// Đường dẫn dẫn đến trang nhập mã OTP
router.get("/otp-password", UserController.showOTPPassword);

/// Thực hiện nhập mã OTP
router.post("/otp-password", UserController.otpPassword);

/// Đường dẫn dẫn đến trang đổi mật khẩu
router.get("/change-password", UserController.showChangePassword);

/// Thực hiện đổi mật khẩu
router.post("/change-password", UserController.changePassword);
module.exports = router;
