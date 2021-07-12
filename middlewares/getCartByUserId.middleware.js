const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");

const getCartByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (user) {
      const [cart] = await Cart.find({ userId: user._id })
        .populate({ path: "products.product" })
        .exec();
      req.cart = cart;
      return next();
    }
    return res
      .status(404)
      .json({ message: "User doesn't exist with given userId" });
  } catch (error) {}
};

module.exports = getCartByUserId;
