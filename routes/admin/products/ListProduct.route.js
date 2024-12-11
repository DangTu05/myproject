const express = require("express");
const router = express.Router();
const ListProductController = require("../../../controllers/admin/products/ListProductController");
router.patch("/change-status/:status/:id", ListProductController.ChangeStatus);
router.delete("/delete/:id", ListProductController.DeleteItem);
router.delete("/delete-multi", ListProductController.DeleteMulti);
router.patch("/change-status/:status", ListProductController.ChangeMultiStatus);
router.get("/", ListProductController.show);
module.exports = router;
