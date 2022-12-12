const router = require("express").Router();
const Post = require("../../models/posts");
const checkAuth = require("../auth/authentication");


router.post("/", checkAuth, async (req, res) => {
  try {
    // create a post
    console.log(req.session.user);

    await Post.create({
      user_id: req.session.user,
      title: req.body.title,
      article: req.body.article,
      date: new Date(),
    });

    res.json({"message": "Success"});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/", checkAuth, async (req, res) => {
  try {
    // update a post
    const result = await Post.update(req.body, {
      where: {
        id: req.body.id,
        user_id: req.session.user
      }
    });

    res.json({updatedRows: result[0]});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
