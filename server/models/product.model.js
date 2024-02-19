const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide a title"],
    },
    category: {
      type: String,
      enum: [
        "WOMEN_ETHNIC",
        "WOMEN_WESTERN",
        "MEN",
        "KIDS",
        "HOME_AND_KITCHEN",
        "BEAUTY_AND_HEALTH",
        "JEWELLERY_AND_ACCESSORIES",
        "BAGS_AND_FOOTWEAR",
        "ELECTRONICS",
      ],
      required: [true, "Please provide a category"],
    },
    tag: {
      type: String,
      required: [true, "please provide tag"],
    },
    image: {
      type: String,
      required: [true, "please provide product image"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
    },
    rating: {
      type: String,
    },
    reviews: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
