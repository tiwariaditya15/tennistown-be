const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
