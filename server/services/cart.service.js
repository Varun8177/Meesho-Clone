const mongoose = require("mongoose");
const HttpException = require("../exceptions/HttpException");
const CartModel = require("../models/cart.model");
const ProductServices = require("./product.service");

const CartServices = {
  getCartById: async (userId) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException(400, "Please provide a valid user id");
    }
    try {
      const cart = await CartModel.find({ userId }).populate("product");
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
      });
      return { totalPrice, cart };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching cart");
      }
    }
  },
  addToCart: async (userId, productId) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException(400, "Please provide a valid user id");
    }
    try {
      const cartItem = await CartModel.findOne({ userId, productId });
      if (cartItem) {
        const updatedCart = await CartModel.findOneAndUpdate(
          { userId, productId },
          { quantity: cartItem.quantity + 1 }
        ).populate("productId");
        return updatedCart;
      }

      const cart = new CartModel({ userId, productId });
      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error adding to cart");
      }
    }
  },
  deleteFromCart: async (userId, productId) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException(400, "Please provide a valid user id");
    }
    try {
      const cartItem = await CartModel.findOneAndDelete({
        userId,
        productId,
      }).populate("product");
      return cartItem;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error deleting cart item");
      }
    }
  },
  updateQuantity: async (userId, productId, type) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException(400, "Please provide a valid user id");
    }
    try {
      const cartItem = await CartModel.findOne({ userId, productId });

      if (!cartItem) throw new HttpException(400, "no cart item found");
      if (!type) throw new HttpException(400, "Please provide a type");

      const val =
        type === "add" ? cartItem.quantity + 1 : cartItem.quantity - 1;
      const updatedCart = await CartModel.findByIdAndUpdate(
        cartItem._id,
        {
          quantity: val,
        },
        { new: true }
      ).populate("product");
      return updatedCart;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error updating cart item");
      }
    }
  },
  clearCart: async (userId) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException(400, "Please provide a valid user id");
    }
    try {
      const cartItem = await CartModel.deleteMany({
        userId,
      });
      return cartItem;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error deleting cart item");
      }
    }
  },
};

module.exports = CartServices;
