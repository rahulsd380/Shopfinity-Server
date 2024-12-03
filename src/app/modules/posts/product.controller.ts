import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.services';

// Create product
const createProduct = catchAsync(async (req, res) => {
  const file = req.file;
    const result = await ProductServices.createProduct(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// Get all product with filteration
const getAllProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  const result = await ProductServices.getAllProducts(page, limit, search);

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


const updateProduct = catchAsync(async (req, res) => {
  const file = req.file;
  const {productId} = req.params;
  const result = await ProductServices.updateProduct(productId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// const updatePost = catchAsync(async (req, res) => {
//   const files = Array.isArray(req.files) ? req.files : [];
//   console.log(files);
//   const { postId } = req.params;
//   const result = await PostServices.updatePost(postId, req.body, files);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Post updated successfully',
//     data: result,
//   });
// });

// const deletePost = catchAsync(async (req, res) => {
//   const { postId } = req.params;
//   const result = await PostServices.deletePost(postId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Post deleted successfully',
//     data: result,
//   });
// });


export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  // deletePost,
};
