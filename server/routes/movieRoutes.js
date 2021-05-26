const express = require("express");
const router = express.Router();
const { removeFromFav, addToFav } = require("../controllers/movieController");

router.route("/save/:id").post(addToFav);
router.route("/unsave/:id").post(removeFromFav);

module.exports = router;
