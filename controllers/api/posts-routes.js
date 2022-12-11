const router = require("express").Router();
const Post = require("../../models/posts");
const checkAuth = require("../auth/authentication");


router.post("/",  async (req, res) => {
  try {
    // create a post
    await Post.create(req.body);

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
      }
    });

    res.json({updatedRows: result[0]});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
