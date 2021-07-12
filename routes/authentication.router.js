const express = require("express");
const router = express.Router();
const {
  login,
  emailSignup,
} = require("../controllers/authentication.controller");

// /accounts
router.post("/login", login);

router.post("/emailsignup", emailSignup);

module.exports = router;
