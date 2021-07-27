const { User } = require("../models/user.model");
const { Wishlists } = require("../models/wishlists.model");
const getWishlistsByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (user) {
      const [wishlists] = await Wishlists.find({ userId: user._id }).populate(
        "products.product"
      );
      req.wishlists = wishlists;
      return next();
    }
    return res
      .status(404)
      .json({ message: "User doesn't exist with given userId" });
  } catch (error) {
    //   Todo: check once when would this be thrown
    res.status(500).json({ message: "Internal Error!" });
  }
};

module.exports = getWishlistsByUserId;
