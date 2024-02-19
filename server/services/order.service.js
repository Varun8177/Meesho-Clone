const mongoose = require("mongoose");
const HttpException = require("../exceptions/HttpException");
const OrderModel = require("../models/orders.model");
const AddressModel = require("../models/address.model");

const OrderServices = {
  createOrderService: async (data, userId) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

      if (!isValidObjectId) {
        throw new HttpException(400, "Please provide a valid user id");
      }

      if (!data.deliveryAddress) {
        const address = await AddressModel.findOne({ default: true });
        data = { ...data, deliveryAddress: address };
      }

      const order = new OrderModel({ ...data, user: userId });
      await order.save();
      return order;
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = [];

        for (const key in error.errors) {
          validationErrors.push(error.errors[key].message);
        }

        const errorMessage = `Validation error: ${validationErrors.join(", ")}`;

        throw new HttpException(400, errorMessage);
      } else if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error creating order");
      }
    }
  },
  getUserOrderServices: async (userId) => {
    try {
      const orders = await OrderModel.find({ user: userId, checkedOut: true })
        .populate("user")
        .populate("products")
        .populate("deliveryAddress")
        .sort({ createdAt: -1 });

      return orders;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error adding address");
      }
    }
  },
  getOrderByIdServices: async (orderId) => {
    try {
      const order = await OrderModel.findById(orderId)
        .populate("user")
        .populate("products")
        .populate("deliveryAddress");

      return order;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching order details");
      }
    }
  },

  updateOrderByIdService: async (orderId, changes) => {
    try {
      const order = await OrderModel.findByIdAndUpdate(orderId, changes, {
        new: true,
      })
        .populate("user")
        .populate("products")
        .populate("deliveryAddress");

      return order;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error updating order details");
      }
    }
  },
};

module.exports = OrderServices;
