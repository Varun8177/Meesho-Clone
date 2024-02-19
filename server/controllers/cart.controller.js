const CartServices = require("../services/cart.service");

const CartController = {
  getCart: async (req, res, next) => {
    const userId = req.body.user;
    try {
      const cart = await CartServices.getCartById(userId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },
  addToCart: async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.body.user;
    try {
      const cart = await CartServices.addToCart(userId, productId);
      res.status(201).send(cart);
    } catch (error) {
      next(error);
    }
  },
  deleteFromCart: async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.body.user;
    try {
      const cart = await CartServices.deleteFromCart(userId, productId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },

  clearCart: async (req, res, next) => {
    const userId = req.body.user;
    try {
      const cart = await CartServices.clearCart(userId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },

  updateQuantity: async (req, res, next) => {
    const productId = req.params.productId;
    const type = req.params.type || "add";
    const userId = req.body.user;
    try {
      const cart = await CartServices.updateQuantity(userId, productId, type);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CartController;
