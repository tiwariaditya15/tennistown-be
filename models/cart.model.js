const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ObejectId missing."],
      },
      quantity: {
        type: Number,
        default: 1,
        required: [true, "Quantity is missing."],
        validate: {
          validator: function (v) {
            return v >= 0;
          },
          message: (props) =>
            `Quantity should be greater than 0. Got ${props.value} instead.`,
        },
      },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
