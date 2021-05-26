const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const addToFav = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  const decoded = jwt.verify(token, "somesecret");
  const userId = decoded.userId;

  const movieId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user.favourites.includes(movieId)) {
        user.favourites.push(movieId);
        user.save();
      } else {
        return res.status(400).json({
          success: false,
          msg: "Already added to Favourites.",
        });
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        msg: "Movie added to Favourites successfully.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: `Movie with id: ${movieId} was NOT added to Favourites successfully.`,
      });
    });
});

const removeFromFav = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "somesecret");
  const userId = decoded.userId;

  const movieId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user.favourites.includes(movieId)) {
        let movieIndex = user.favourites.indexOf(movieId);
        user.favourites.splice(movieIndex, 1);
        user.save();
        return res.status(200).json({
          success: true,
          msg: "Movie removed from Favourites successfully.",
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: `No movie with id: ${movieId}.`,
        });
      }
    })
    .then(() => {})
    .catch((err) => {
      return res.status(500).json({
        msg: `Movie with id: ${movieId} was NOT added to Favourites successfully.`,
      });
    });
});

module.exports = { addToFav, removeFromFav };
