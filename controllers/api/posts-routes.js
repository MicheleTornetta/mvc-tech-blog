const router = require("express").Router();
const Post = require("../../models/posts");
const checkAuth = require("../auth/authentication");


router.post("/", checkAuth, async (req, res) => {
  try {
    // create a post
    await Post.create(req.body);

    res.json({ message: "Success!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
