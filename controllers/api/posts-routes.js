const router = require("express").Router();
const Post = require("../../models/posts");

router.post("/", async (req, res) => {
  try {
    // create a post
    await Post.create(req.body);

    res.json({ message: "Success!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
