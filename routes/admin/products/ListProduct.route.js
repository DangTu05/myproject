const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
const ListProductController = require("../../../controllers/admin/products/ListProductController");
router.patch(
  "/change-status/:status/:id",
  AuthMiddleware.requireAuth,
  ListProductController.ChangeStatus
);
router.delete(
  "/delete/:id",
  AuthMiddleware.requireAuth,
  ListProductController.DeleteItem
);
router.delete(
  "/delete-multi",
  AuthMiddleware.requireAuth,
  ListProductController.DeleteMulti
);
router.patch(
  "/change-status/:status",
  AuthMiddleware.requireAuth,
  ListProductController.ChangeMultiStatus
);
router.get("/", AuthMiddleware.requireAuth, ListProductController.show);
module.exports = router;
