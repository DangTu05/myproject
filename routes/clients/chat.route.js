const express = require("express");
const router = express.Router();
const ChatController = require("../../controllers/clients/ChatController");
const locals = require("../../middlewares/client/products/Home.Middleware");
const user = require("../../middlewares/client/auth/User.Middleware");
const auth = require("../../middlewares/client/auth/Auth.Middleware");
router.use(locals.locals);
router.get("/", auth.auth, user.user, ChatController.showChat);
module.exports = router;
