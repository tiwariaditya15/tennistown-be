const express = require("express");
const { Product } = require("../models/product.model");
const router = express.Router();

router.param("productId", (req, res, next, productId) => {
  console.log({ productId });
  req.yes = "yessir";
  next();
});

router.route("/").get(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ status: 200, products });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, error: error });
  }
});

router.route("/:productId").get((req, res) => {
  res.json({
    success: true,
    route: "/products/:productId",
  });
});
module.exports = router;
