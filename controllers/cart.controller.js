const ObjectId = require("mongoose").Types.ObjectId;
const { extend } = require("lodash");

const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");

const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.find({ userId })
      .populate("products.productId")
      .exec();

    res.json({ status: 200, cart: cart[0] });
  } catch (error) {
    res.json({ status: 500, error });
  }
};

const addProductToCart = async (req, res) => {
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
          !cart.products.some((product) => product.productId.equals(productId))
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
};

const updateProductQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  console.log({ userId, productId, quantity });
  if (ObjectId.isValid(userId)) {
    try {
      const [cart] = await Cart.find({ userId });

      if (cart) {
        const olderProduct = cart.products.find((item) =>
          item.productId.equals(productId)
        );
        extend(olderProduct, { quantity });
        await cart.save();
        return res.json({ status: 200, productId, quantity });
      }
      res.json({
        status: 404,
        message: "Couldn't find cart with given userID",
      });
    } catch (error) {
      res.json({ status: 500, error });
    }
  } else {
    res.json({ status: 400, message: "UserID isn't a valid mongoose id." });
  }
};

module.exports = { getCart, addProductToCart, updateProductQuantity };
