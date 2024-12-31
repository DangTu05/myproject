const express = require("express");
const router = express.Router();
const RoleController = require("../../../controllers/admin/roles/RoleController");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
router.get("/create", AuthMiddleware.requireAuth, RoleController.show);
router.post("/create", AuthMiddleware.requireAuth, RoleController.create);
router.get("/roles", AuthMiddleware.requireAuth, RoleController.roles);
router.get(
  "/permissions",
  AuthMiddleware.requireAuth,
  RoleController.permissions
);
router.get("/edit/:id", AuthMiddleware.requireAuth, RoleController.showEdit);
router.patch("/edit/:id", AuthMiddleware.requireAuth, RoleController.edit);
router.patch(
  "/permissions",
  AuthMiddleware.requireAuth,
  RoleController.updatePermissions
);
router.delete("/delete/:id", AuthMiddleware.requireAuth, RoleController.delete);
module.exports = router;
