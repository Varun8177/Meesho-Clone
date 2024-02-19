const express = require("express");
const EnsureAuth = require("../middlewares/Auth.middleware");
const OrderController = require("../controllers/order.controller");
const router = express.Router();
const path = "/order";

router.get("/", EnsureAuth, OrderController.getUserOrders);
router.get("/:orderId", EnsureAuth, OrderController.getOrdersById);
router.post("/", EnsureAuth, OrderController.createOrder);
router.patch("/:orderId", EnsureAuth, OrderController.updateOrderById);

module.exports = { path, router };
