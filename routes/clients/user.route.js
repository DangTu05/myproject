const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/clients/UserController");
router.get("/register", UserController.showRegister);
router.post("/register", UserController.register);
module.exports = router;
