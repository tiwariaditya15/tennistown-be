const express = require("express");
const { ProductModel } = require("../models/product.model");
const router = express.Router();

// extract product beforehand to remove repetition
router.param("productId", (req, res, next, productId) => {
  console.log({ productId });
  req.yes = "yessir";
  next();
});

// routes - /products/
router
  .route("/")
  .get((req, res) => {
    res.json({ success: true, route: "/products/", method: "GET" });
  })
  .post((req, res) => {
    try {
      const product = req.body;
      const newProduct = new ProductModel(product);
      newProduct.save();
      res.json({ status: 201, success: true });
    } catch (err) {
      res.json({ status: 500, success: false, error: err });
    }
  });

// routes - /products/:productId
router
  .route("/:productId")
  .get((req, res) => {
    res.json({
      success: true,
      route: "/products/:productId",
      method: "GET",
      type: req.yes,
      param: req.params.productId,
    });
  })
  .post((req, res) => {
    res.json({
      success: true,
      route: "/products/:productId",
      method: "POST",
      param: req.params.productId,
    });
  });

module.exports = router;
