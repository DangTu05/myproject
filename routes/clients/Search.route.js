const express = require("express");
const router = express.Router();
const user = require("../../middlewares/client/auth/User.Middleware");
const Search = require("../../controllers/clients/SearchController");
const locals = require("../../middlewares/client/products/Home.Middleware");

/// Đường dẫn dẫn đến trang search
router.get("/", user.user, locals.locals, Search.index);
module.exports = router;
