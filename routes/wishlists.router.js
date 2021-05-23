const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlists.model");
router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {})
  .delete((req, res) => {
    res.json({ status: 201 });
  });

router.route("/:productId").post((req, res) => {});

module.exports = router;
