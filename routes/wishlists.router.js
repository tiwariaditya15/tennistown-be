const express = require("express");
const router = express.Router();

const {
  getWishlists,
  updateWishlists,
} = require("../controllers/wishlists.controller");

router.route("/").get(getWishlists);

router.route("/update").post(updateWishlists);

module.exports = router;
