import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.services';

// Create product
const createProduct = catchAsync(async (req, res) => {
  const files = Array.isArray(req.files) ? req.files : [];
  const result = await ProductServices.createProduct(req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// Add review on product
const addReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { userId,userName, rating, reviewText } = req.body;

  const result = await ProductServices.addReview(productId, userId,userName, rating, reviewText);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

// Get all product with filteration
const getAllProducts = catchAsync(async (req, res) => { 
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const category = req.query.category as string;
  const brand = req.query.brand as string;
  const rating = parseFloat(req.query.rating as string);
  const priceRange = req.query.priceRange as string;

  const result = await ProductServices.getAllProducts(page, limit, search, category, brand, rating, priceRange);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: {
      metadata: {
        totalProducts: result.totalProducts,
        productsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(result.totalProducts / limit),
      },
      products: result.products,
    },
  });
});


// Get single product by id
const getSingleProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductById(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully.',
    data: result,
  });
});

// Get single product by category
const getProductsByCategory = catchAsync(async (req, res) => {
  const { categoryName } = req.params;
  const result = await ProductServices.getProductsByCategory(categoryName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched by category successfully.',
    data: result,
  });
});

// const getMyProducts = catchAsync(async (req, res) => {
//   const { sellerId } = req.params;
//   const result = await ProductServices.getMyProducts(sellerId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product fetched successfully.',
//     data: result,
//   });
// });

const getAllBrands = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllBrands();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brands fetched successfully",
    data: result,
  });
});



// Update product
const updateProduct = catchAsync(async (req, res) => {
  const file = req.file;
  const { productId } = req.params;
  const result = await ProductServices.updateProduct(productId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete product by id
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});


export const ProductControllers = {
  createProduct,
  addReview,
  getAllProducts,
  getSingleProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getAllBrands,
  // getMyProducts

};
