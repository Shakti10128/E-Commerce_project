const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const productRoute = express.Router();

productRoute.get('/products',getAllProducts);
productRoute.get('/product/:id',getProductDetails);
productRoute.post('/product',createProduct);
productRoute.put('/product/:id',updateProduct);
productRoute.delete('/product/:id',deleteProduct);



module.exports = productRoute;