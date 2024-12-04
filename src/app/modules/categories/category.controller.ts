import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await CategoryServices.createCategory(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  const result = await CategoryServices.getAllCategories(page, limit, search);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: {
      metadata: {
        totalCategories: result.totalCategories,
        categoriesPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(result.totalCategories / limit),
      },
      categories: result.categories,
    },
  });
});

const getSingleCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.getSingleCategoryById(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully.',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const file = req.file;
  const { categoryId } = req.params;
  const result = await CategoryServices.updateCategory(categoryId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.deleteCategory(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategoryById,
  updateCategory,
  deleteCategory,
};
