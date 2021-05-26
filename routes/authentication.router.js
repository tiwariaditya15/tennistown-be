const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

// /accounts
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username, password });
    user.length
      ? res.json({ status: 200, success: true, userId: user[0]._id })
      : res.json({ status: 401, success: false });
  } catch (error) {
    res.json({ status: 500, success: false });
  }
});

router.post("/emailsignup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ status: 201, success: true });
  } catch (err) {
    console.log({ err });
    res.json({ status: 500, success: false, error: err.code });
  }
});

// default route
router.get("/", (req, res) => {
  res.json({
    path: "/accounts/",
  });
});

module.exports = router;
