const express = require("express");
const EnsureAuth = require("../middlewares/Auth.middleware");
const CartController = require("../controllers/cart.controller");
const router = express.Router();
const path = "/cart";

router.get("/", EnsureAuth, CartController.getCart);
router.delete("/", EnsureAuth, CartController.clearCart);
router.post("/:productId", EnsureAuth, CartController.addToCart);
router.delete("/:productId", EnsureAuth, CartController.deleteFromCart);
router.patch("/:productId/:type", EnsureAuth, CartController.updateQuantity);

module.exports = { path, router };
