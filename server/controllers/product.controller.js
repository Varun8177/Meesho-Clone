const ProductServices = require("../services/product.service");

const ProductController = {
  getProduct: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const product = await ProductServices.getProductService(productId);
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  },

  addProduct: async (req, res, next) => {
    const productDetails = req.body;
    console.log(productDetails);
    try {
      const newProduct = await ProductServices.addProductService(
        productDetails
      );
      res.status(201).send(newProduct);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    const productId = req.params.productId;
    const updatedProductDetails = req.body;
    try {
      await ProductServices.updateProductService(
        productId,
        updatedProductDetails
      );
      res.status(200).send("Product updated successfully");
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const deletedProduct = await ProductServices.deleteProductService(
        productId
      );
      res.status(200).send(deletedProduct);
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const category = req.query.category;
    const tag = req.query.tag || "";
    const sort = req.query.sort || "";

    try {
      const result = await ProductServices.getAllProductsService(
        page,
        perPage,
        category,
        tag,
        sort
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
  getRandomProducts: async (req, res, next) => {
    try {
      const products = await ProductServices.getRandomProducts();
      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProductController;
