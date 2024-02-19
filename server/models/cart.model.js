const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "please provide a user id"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: [true, "please provide a product id"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

cartSchema.virtual("product", {
  ref: "products",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
