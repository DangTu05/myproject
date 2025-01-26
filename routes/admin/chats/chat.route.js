const express = require("express");
const router = express.Router();
const ChatController = require("../../../controllers/admin/chats/ChatController");
router.get("/:room_id", ChatController.showChat);
module.exports = router;
