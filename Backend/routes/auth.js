const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
	AuthRegisterPost,
	AuthLoginPost,
	AuthCookieLoginPost,
	AuthLogout,
	AuthRegisterGet,
} = require("../controllers/authController");
router.get("/register", AuthRegisterGet);
router.post("/register", AuthRegisterPost);
router.post("/login", AuthLoginPost);
router.post("/cookie/login", AuthCookieLoginPost);
router.post("/logout", AuthLogout);
module.exports = router;
