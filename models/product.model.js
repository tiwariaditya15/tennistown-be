const mongoose = require("mongoose");
const { Schema } = mongoose;

const PriceSchema = new Schema({
  discounted: { type: Number },
  retail: { type: Number },
});

const ProductSchema = new Schema({
  name: { type: String },
  price: PriceSchema,
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
