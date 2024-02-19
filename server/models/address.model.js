const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide a user id"],
    },
    house_no: {
      type: String,
      required: [true, "please provide a house number"],
    },
    area: {
      type: String,
      required: [true, "please provide area"],
    },
    pincode: {
      type: Number,
      required: [true, "please provide a pincode"],
    },
    city: {
      type: String,
      required: [true, "please provide a city"],
    },
    country: {
      type: String,
      default: "India",
    },
    nearby_location: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: [true, "please provide name"],
    },
    mobile: {
      type: String,
      required: [true, "please provide mobile number"],
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;
