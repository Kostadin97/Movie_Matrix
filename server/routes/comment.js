const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const { comment, movieId } = req.body;
  const token = req.headers.authorization;
  let userId = jwt.decode(token, "somesecret").userId;
  console.log(userId);

  const commentObj = new Comment({
    writer: userId,
    movieId: movieId,
    content: comment,
  });

  commentObj.save().then((result) => {
    return res.status(200).json({ success: true, result });
  });
});

router.get("/getComments/:movieId", async (req, res) => {
  await Comment.find({ movieId: req.params.movieId })
    .then((comments) => {
      res.status(200).json({ success: true, comments });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
