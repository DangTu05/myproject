const express = require("express");
const multer = require("multer");
const storage = require("../../../helpers/StorageMulti.helper");
const EditController = require("../../../controllers/admin/products/EditProductController");
const upload = multer({ storage: storage });
const router = express.Router();
router.get("/edit/:id", EditController.show);
router.patch("/edit/:id", upload.single("img"), EditController.Edit);
module.exports = router;
