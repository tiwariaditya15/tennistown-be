const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
