var express = require("express");
var router = express.Router();
var { getCategories, createCategory } = require("../controllers/categories");
var authUser = require("../middlewares/authUser")

/* GET TODO CATEGORY */
router.get("/", authUser, getCategories);

/* ADD TODO CATEGORY */
router.post("/", authUser, createCategory);


module.exports = router;

