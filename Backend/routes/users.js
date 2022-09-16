const router = require("express").Router();
const User = require("../models/User");
const db = require("../server")
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Update your account Info");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json("You only edit your account");
	}
});

router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			return res.status(200).json("Delete your account");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json("You can delete only your account");
	}
});
router.get("/", async (req, res) => {
	const userId = req.query.userId;
	const username = req.body.username;
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		const { password, updatedAt, ...otehr } = user._doc;
		return res.status(200).json(otehr);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.body.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.follower.includes(req.body.userId)) {
				await user.updateOne({
					$push: {
						follower: req.body.userId,
					},
				}),
					await currentUser.updateOne({
						$push: {
							follow: req.params.id,
						},
					});
				return res.status(200).json("success foolow");
			}
		} catch (error) {
			res.status(500), json(error);
		}
	} else {
		return res.status(500).json("You can follow yourself");
	}
});

router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.body.userId) 
			const currentUser = await User.findById(req.body.userId);
			if (user.follower.includes(req.body.userId)){
				await user.updateOne({
					$pull :{
						follower : req.body.userId
					},
				})
					await currentUser.updateOne({
						$pull: {
							follow : req.params.id
						}
					})
				return res.status(200).json("success delete")
			} else {
				return res.status(403).json("You already unfoolowed")
			}
		} catch (error) {
			return res.status(500).json(error)
		}
	} else {
		return res.status(500).json("You can't unfoolow yourself")
	}
})
module.exports = router;
