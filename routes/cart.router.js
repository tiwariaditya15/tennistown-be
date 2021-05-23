const express = require("express");
const { extend } = require("lodash");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");

router.route("/:userId").get(async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.query.userId });
    res.json({ status: 200, cart });
  } catch (error) {
    res.json({ status: 500, error });
  }
});

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { productId, userId, cartId, quantity } = req.body;

      if (cartId === undefined) {
        const cart = new Cart();
        cart.userId = userId;
        cart.products.push({ productId, quantity });
        const addedCart = await cart.save();
        res.json({ status: 200, addedCart });
      } else if (
        ObjectId.isValid(cartId) &&
        ObjectId.isValid(userId) &&
        ObjectId.isValid(productId)
      ) {
        const user = await User.findById(userId);
        const [cart] = await Cart.find({ userId: user._id, _id: cartId });

        if (cart) {
          if (
            !cart.products.some((product) =>
              product.productId.equals(productId)
            )
          ) {
            cart.products.push({ productId, quantity });
            const updatedCart = await cart.save();
            return res.json({ status: 200, updatedCart });
          }
          res.json({ status: 409, message: "Product already exists in cart." });
        } else {
          res.json({
            status: 404,
            message: "User/Cart with sent UserID/CartID not found.",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "UserID/CartID/ProductID isn't valid mongoose ObjectID.",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, error });
    }
  })
  .delete((req, res) => {
    res.json({ status: 201 });
  });

router.route("/update/:cartId").post(async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  if (ObjectId.isValid(cartId)) {
    try {
      const cart = await Cart.findById(cartId);

      // cart.products.some((product) => product.productId.equals(productId))
      // console.log(
      //   extend(cart, {
      //     ...cart,
      //     products: ,
      //   })
      // );
      const ret = cart.products.map((product) => {
        return product.productId.equals(productId)
          ? {
              ...product,
              quantity,
            }
          : {
              ...product,
            };
      });
      console.log({ ret });
    } catch (error) {
      res.json({ status: 500, error });
    }
  } else {
    res.json({ status: 400, message: "CartID isn't a valid mongoose id." });
  }
});

module.exports = router;
