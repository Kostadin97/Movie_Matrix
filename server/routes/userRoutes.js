const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getFavourites,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.route("/getFavourites").get(getFavourites);

module.exports = router;
