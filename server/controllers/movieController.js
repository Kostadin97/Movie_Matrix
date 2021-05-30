const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const addToFav = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, "somesecret");
  const userId = decoded.userId;

  const movieId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user.favourites.find((movie) => movie.movieId === movieId)) {
        user.favourites.push(req.body);
        user.save().then((result) => {
          return res.status(200).json({
            success: true,
            result,
            msg: "Movie added to Favourites successfully.",
          });
        });
      } else {
        return res.status(400).json({
          msg: "Movie Already Added to Favourites",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        msg: `Movie with id: ${movieId} was NOT added to Favourites successfully.`,
      });
    });
});

const removeFromFav = asyncHandler(async (req, res) => {
  const token = req.body.headers.Authorization;

  const decoded = jwt.verify(token, "somesecret");
  const userId = decoded.userId;

  const movieId = req.params.id;
  User.findById(userId)
    .then((user) => {
      let movieIndex = user.favourites.indexOf(movieId);
      user.favourites.splice(movieIndex, 1);
      user.save().then((result) => {
        return res.status(200).json({
          success: true,
          msg: "Movie removed from Favourites successfully.",
          result,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: `Movie with id: ${movieId} was NOT added to Favourites successfully.`,
      });
    });
});

module.exports = { addToFav, removeFromFav };
