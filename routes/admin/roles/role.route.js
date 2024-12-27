const express = require("express");
const router = express.Router();
const RoleController = require("../../../controllers/admin/roles/RoleController");
router.get("/create", RoleController.show);
router.post("/create", RoleController.create);
router.get("/roles", RoleController.roles);
router.get("/permissions", RoleController.permissions);
router.delete("/delete/:id", RoleController.delete);
module.exports = router;
