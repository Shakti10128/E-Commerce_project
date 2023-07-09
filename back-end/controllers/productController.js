const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const productCollection = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productCollection.create(req.body);
  return res.status(201).json({
    succuss: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

  // search functionality
  const apiFeatures = new ApiFeatures(productCollection.find(),req.query).search().filter();

  const products = await apiFeatures.query;
  return res.status(200).json({
    succuss: true,
    products,
  });
});

// get single product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await productCollection.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  // if product exit then return it
  res.status(200).json({
    success: true,
    product,
  });
});

// update product ---------->>>>> admin route

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productCollection.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await productCollection.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productCollection.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  // if product exist then delete it from the database
  await productCollection.findByIdAndDelete(req.params.id);
  // await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
