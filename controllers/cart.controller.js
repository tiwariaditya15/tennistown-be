const ObjectId = require("mongoose").Types.ObjectId;
const { extend } = require("lodash");

const { Cart } = require("../models/cart.model");

const getCart = async (req, res) => {
  try {
    const { cart } = req;
    res.json({
      status: 200,
      products: cart.products.filter((product) => product.quantity),
    });
  } catch (error) {
    res.json({ status: 500, error });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { cart, userId } = req;
    if (ObjectId.isValid(productId)) {
      if (cart) {
        if (
          !cart.products.some((product) => product.product.equals(productId))
        ) {
          cart.products.push({ product: productId, quantity });
          await cart.save();
          const updatedCart = await Cart.find({ userId }).populate(
            "products.product"
          );

          const updatedProduct = updatedCart[0].products.find((product) =>
            product.product.equals(productId)
          );

          return res.json({ status: 200, updatedProduct });
        } else {
          const product = cart.products.find((productItem) =>
            productItem.product.equals(productId)
          );
          extend(product, { quantity });
          await cart.save();

          const updatedCart = await Cart.find({ userId }).populate(
            "products.product"
          );

          const updatedProduct = updatedCart[0].products.find((product) =>
            product.product.equals(productId)
          );

          return res.json({ status: 200, updatedProduct });
        }
      } else {
        return res.json({
          status: 404,
          message: "User/Cart with sent UserID/CartID not found.",
        });
      }
    } else {
      return res.json({
        status: 400,
        message: "ProductID isn't valid mongoose ObjectID.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 500, error });
  }
};

const updateProductQuantity = async (req, res) => {
  const { cart } = req;
  const { productId, quantity } = req.body;

  try {
    // when inc/dnc
    const olderProduct = cart.products.find((item) =>
      item.product.equals(productId)
    );
    extend(olderProduct, { quantity });

    await cart.save();
    return res.json({ status: 200, product: productId, quantity });
  } catch (error) {
    res.json({ status: 500, error });
  }
};

module.exports = {
  getCart,
  addProductToCart,
  updateProductQuantity,
};
