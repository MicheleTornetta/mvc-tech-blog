const router = require("express").Router();
const Comments = require("../../models/comments");
const checkAuth = require("../auth/authentication");

router.post("/", checkAuth, async (req, res) => {
  try {
    // create a post
    await Comments.create(req.body);

    res.json({ message: "Success!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
