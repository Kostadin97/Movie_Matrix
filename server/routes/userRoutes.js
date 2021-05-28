const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getLikes,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.route("/getLikes").get(getLikes);

module.exports = router;
