const User = require("../models/User");
const bcrypt = require("bcrypt");

const AuthRegisterPost = async (req, res) => {
	try {
		await bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
			console.log("hashed", hashedPassword);
		});
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		const user = await newUser.save();
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const AuthRegisterGet = (req, res) => {
	const cookie = req.session.name;
	// console.log(cookie);
	if (!cookie) return res.send("no cookie");
	res.send(cookie);
};
const AuthLoginPost = async (req, res) => {
	try {
		req.session.name = req.body.username;
		const user = await User.findOne({ username: req.body.username });
		if (!user) return res.status(404).send("We can not find the user");
		const vailedPassword = req.body.password === user.password;
		if (!vailedPassword) return res.status(400).json("password is wrong");
		res.cookie("user", `${req.body.username}`);
		// res.redirect("/timeline");
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json;
	}
};
const AuthCookieLoginPost = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return res.status(404).send("We can not find the user");
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json;
	}
};
const AuthLogout = async (req, res) => {
	req.session = null;
	return res.status(200).json("user logout");
};

module.exports = {
	AuthRegisterPost,
	AuthLoginPost,
	AuthCookieLoginPost,
	AuthLogout,
	AuthRegisterGet,
};
