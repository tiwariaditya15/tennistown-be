const express = require("express");
const router = express.Router();

const {
  getCart,
  addProductToCart,
  updateProductQuantity,
} = require("../controllers/cart.controller");

router.route("/:userId").get(getCart);

router.route("/").post(addProductToCart);

router.route("/update/:userId").post(updateProductQuantity);

module.exports = router;
