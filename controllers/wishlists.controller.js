const { Wishlists } = require("../models/wishlists.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { extend } = require("lodash");

const getWishlists = async (req, res) => {
  try {
    const { wishlists } = req;
    res.json({
      status: 200,
      wishlists: wishlists.products.filter((product) => product.wishlisted),
    });
  } catch (error) {
    console.log({ error });
    res.json({ status: 500, message: error });
  }
};

const updateWishlists = async (req, res) => {
  const { wishlists } = req;
  const { productId } = req.body;
  try {
    if (
      wishlists.products.some((productItem) =>
        productItem.product.equals(productId)
      )
    ) {
      const productFound = wishlists.products.find((productItem) =>
        productItem.product.equals(productId)
      );
      extend(productFound, { wishlisted: !productFound.wishlisted });
      await wishlists.save();
      const [updatedWishlists] = await Wishlists.find({ userId: req.userId })
        .populate({ path: "products.product" })
        .exec();

      return res.json({
        status: 200,
        wishlists: updatedWishlists.products.filter(
          (product) => product.wishlisted
        ),
      });
    }

    wishlists.products.push({ product: productId, wishlisted: true });
    await wishlists.save();
    const [updatedWishlists] = await Wishlists.find({ userId: req.userId })
      .populate("products.product")
      .exec();

    return res.json({
      status: 200,
      wishlists: updatedWishlists.products.filter(
        (product) => product.wishlisted
      ),
    });
  } catch (error) {
    console.log({ error });
    res.json({ status: 500, message: error });
  }
};
module.exports = { getWishlists, updateWishlists };
