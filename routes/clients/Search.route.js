const express = require("express");
const router = express.Router();
const Search = require("../../controllers/clients/SearchController");
const locals = require("../../middlewares/client/products/Home.Middleware");
router.get("/",locals.locals, Search.index);
module.exports = router;
