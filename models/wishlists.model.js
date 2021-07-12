const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product Objectid is missing."],
      },
      wishlisted: {
        type: Boolean,
        default: false,
        required: [true, "Wishlisted is missing."],
        validate: {
          validator: function (v) {
            return typeof v !== Boolean;
          },
          message: (props) => `${props.value} isn't bool value`,
        },
      },
    },
  ],
});

const Wishlists = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlists };
