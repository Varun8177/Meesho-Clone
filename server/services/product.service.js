const mongoose = require("mongoose");
const HttpException = require("../exceptions/HttpException");
const ProductModel = require("../models/product.model");
const CartModel = require("../models/cart.model");

const ProductServices = {
  getRandomProducts: async () => {
    try {
      const products = await ProductModel.aggregate([
        { $sample: { size: 10 } },
      ]);
      return products;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching product");
      }
    }
  },
  getAllProductsService: async (
    page = 1,
    perPage = 10,
    category,
    tag,
    sort
  ) => {
    const query = { category };
    console.log(query);
    try {
      const totalProducts = await ProductModel.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / perPage);

      const sortCriteria = {};

      if (sort) {
        sortCriteria.price = sort === "desc" ? -1 : 1;
      }

      if (tag) {
        query.tag = { $in: tag };
      }

      const products = await ProductModel.find(query)
        .sort(sortCriteria)
        .skip((page - 1) * perPage)
        .limit(perPage);

      const tags = await ProductModel.distinct("tag", { category });
      return {
        filterOptions: tags,
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      };
    } catch (error) {
      throw new HttpException(500, "Error fetching all products");
    }
  },
  getSearchResultService: async (text) => {
    try {
      const products = await ProductModel.find({
        title: { $regex: text, $options: "i" },
      });
      return products;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching product");
      }
    }
  },
  getProductService: async (productId) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);

      if (!isValidObjectId) {
        throw new HttpException(400, "Please provide a valid product id");
      }

      const product = await ProductModel.findOne({ _id: productId });
      if (!product) {
        throw new HttpException(404, "No product found");
      }
      const IsInCart = await CartModel.findOne({ productId: product._id });
      const data = { ...product._doc, alreadyInCart: IsInCart ? true : false };
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error fetching product");
      }
    }
  },

  addProductService: async (productDetails) => {
    try {
      const newProduct = new ProductModel(productDetails);
      await newProduct.save();
      return newProduct;
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
        throw new HttpException(500, "Error adding product");
      }
    }
  },

  updateProductService: async (productId, updatedProductDetails) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);

      if (!isValidObjectId) {
        throw new HttpException(400, "Please provide a valid product id");
      }
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        updatedProductDetails,
        { new: true }
      );

      if (!updatedProduct) {
        throw new HttpException(404, "No product found");
      }
      return updatedProduct;
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
        throw new HttpException(500, "Error updating product");
      }
    }
  },
  deleteProductService: async (productId) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);

      if (!isValidObjectId) {
        throw new HttpException(400, "Please provide a valid product id");
      }

      const deletedProduct = await ProductModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        throw new HttpException(404, "No product found");
      }

      return deletedProduct;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, "Error deleting product");
      }
    }
  },
};

module.exports = ProductServices;
