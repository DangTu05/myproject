const express = require("express");
const router = express.Router();
const ChatController = require("../../../controllers/admin/chats/ChatController");
const AuthMiddleware = require("../../../middlewares/admin/auth/auth.middleware");
router.use(AuthMiddleware.requireAuth);
router.get("/:room_id", ChatController.showChat);
router.delete("/:room_id", ChatController.deleteChat);
module.exports = router;
