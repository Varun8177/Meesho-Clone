const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "please provide a user id"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: [true, "please provide a product id"],
      },
    ],
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    total: {
      type: Number,
      required: [true, "please provide total price"],
    },
    checkedOut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
