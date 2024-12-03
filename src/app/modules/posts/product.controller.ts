import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.services';

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

// const getAllPosts = catchAsync(async (req, res) => {
//   const result = await PostServices.getAllPosts();

//   if (result.length === 0 || result.length === undefined) {
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: false,
//       message: 'No posts found.',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Posts retrieved successfully',
//     data: result,
//   });
// });

// const getSinglePostById = catchAsync(async (req, res) => {
//   const { postId } = req.params;
//   const result = await PostServices.getSinglePostById(postId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Post fetched successfully.',
//     data: result,
//   });
// });

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
  // getAllPosts,
  // getSinglePostById,
  // updatePost,
  // deletePost,
};
