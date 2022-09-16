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
// router.get("/register", async (req, res) => {
// 	const cookie = req.session.name;
// 	console.log(cookie);
// 	if (!cookie) return res.send("no cookie");
// 	res.send(cookie);
// });
// router.post("/register", async (req, res) => {
// 	try {
// 		await bcrypt.hash(req.body.password, 12).then(hashedPassword => {
// 			console.log("hashed",hashedPassword)
// 		})
// 		const newUser = await new User({
// 			username: req.body.username,
// 			email: req.body.email,
// 			password: req.body.password,
// 		});
// 		const user = await newUser.save();
// 		return res.status(200).json(user);
// 	} catch (error) {
// 		return res.status(500).json(error);
// 	}
// });
// router.post("/login", async (req, res) => {
// 	try {
// 		req.session.name = req.body.username
// 		const user = await User.findOne({ username: req.body.username });
// 		if (!user) return res.status(404).send("We can not find the user");
// 		const vailedPassword = req.body.password === user.password;
// 		if (!vailedPassword) return res.status(400).json("password is wrong");
// 		res.cookie('user', `${req.body.username}`);
// 		// res.redirect("/timeline");
// 		return res.status(200).json(user);
// 	} catch (error) {
// 		return res.status(500).json;
// 	}
// });
// router.post("/cookie/login", async (req, res) => {
// 	try {
// 		const user = await User.findOne({ username: req.body.username });
// 		if (!user) return res.status(404).send("We can not find the user");
// 		return res.status(200).json(user);
// 	} catch (error) {
// 		return res.status(500).json;
// 	}
// });
// router.post("/logout", async (req, res) => {
// 	req.session = null;
// 	return res.status(200).json("user logout")
// });
module.exports = router;
