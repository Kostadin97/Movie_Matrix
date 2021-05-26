const express = require("express");
const router = express.Router();
const { addToFav } = require("../controllers/movieController");

router.route("/save/:id").post(addToFav);

module.exports = router;
