const express = require("express");
const ProductController = require("../controllers/product.controller");
const EnsureAuth = require("../middlewares/Auth.middleware");
const router = express.Router();
const path = "/products";

router.post("/", EnsureAuth, ProductController.addProduct);
router.get("/:productId", ProductController.getProduct);
router.put("/:productId", EnsureAuth, ProductController.updateProduct);
router.delete("/:productId", EnsureAuth, ProductController.deleteProduct);
router.get("/", ProductController.getAllProducts);
router.get("/home/random", ProductController.getRandomProducts);
router.get("/search/:search", ProductController.getSearchResults);

module.exports = { path, router };
