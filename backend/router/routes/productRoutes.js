const express = require("express");
// defined productRoute from express
const productRoute = express.Router();

// require all action functions from controller
const {
  addProduct,
  getUserProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { authentication } = require("../middleware/authentication");

// this endpoint to get all products data
productRoute.get("/products", authentication,getAllProduct);

// this endpoint to get product data for one seller
productRoute.get(
  "/products/:id",
  authentication,
  getUserProduct
);

// this endpoint to CRUD a  product 

productRoute.post(
  "/product",
  authentication,
  addProduct
);

productRoute.get(
  "/product/:productId",
  authentication,
  getProduct
);

productRoute.put(
  "/product/:productId",
  authentication,
  updateProduct
);
productRoute.delete(
  "/product/:productId",
  authentication,
  deleteProduct
);
module.exports = productRoute;
