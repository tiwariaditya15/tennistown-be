const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String },
  price: {
    discounted: { type: Number },
    retail: { type: Number },
  },
  brand: { type: String },
  color: { type: String },
  level: { type: String },
  images: [{ type: String }],
  seller: { type: String },
  categories: [{ type: String }],
  ratings: { type: Number },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
