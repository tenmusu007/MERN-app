const router = require("express").Router();
const User = require("../models/User");
const Post  =require('../models/Post');

router.post('/', async (req, res) => {
	// console.log(req.body);
  // const allPost = mongoose.connection.collection("posts").find();
  // const allPost = await Post.find();
	// console.log(allPost);
	const newPost = new Post(req.body);
	try {
		const savePost = await newPost.save();
		return res.status(200).json(savePost);
	} catch (error) {
		return res.status(500).json(error);
	}
});

router.delete("/:Id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.Id)
    if (Post.userId === req.body.userId) {
      await post.deleteOne()
      return res.status(200).json("delete post")
    } else {
      return res.status(403).json("You can delete other's posts")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get("/:id", async (req, res) => {
  // console.log(req.body);
  try {
    const post = await Post.findById(req.params.id)
    return res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
   }
})
 
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          like : req.body.userId
        }
      })
      return res.status(200).json("success like to post")
    } else {
      await post.updateOne({
        $pull: {
          likes : req.body.userId
        }
      })
      return res.status(200).json("You unliked this post")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get("/timeline/:userId", async (req, res) => {
    // const allPost = await Post.find();
		// console.log(allPost);
	try {
    const currentUser = await User.findById(req.params.userId);
		// const currentUser = await User.findById("631bcef06017b90c9f8253da");
    const userPosts = await Post.find({ userId: currentUser._id });
    // console.log(userPosts);
    // console.log(Post);
    // get following posts
		const friendPosts = await Promise.all(
			currentUser.follow.map((friendId) => {
				return Post.find({ userId: friendId });
			})
    );
    // console.log(friendPosts);
		return res.status(200).json(userPosts.concat(...friendPosts));
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get("/timeline/get/All", async (req, res) => {
  try {
    const allPost = await Post.find();
    return res.status(200).json(allPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
