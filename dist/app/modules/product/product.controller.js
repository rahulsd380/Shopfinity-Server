"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const product_services_1 = require("./product.services");
// Create product
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = Array.isArray(req.files) ? req.files : [];
    const result = yield product_services_1.ProductServices.createProduct(req.body, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
// Add review on product
const addReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { userId, userName, rating, reviewText } = req.body;
    const result = yield product_services_1.ProductServices.addReview(productId, userId, userName, rating, reviewText);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review added successfully",
        data: result,
    });
}));
// Get all product with filteration
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const category = req.query.category;
    const brand = req.query.brand;
    const rating = parseFloat(req.query.rating);
    const priceRange = req.query.priceRange;
    const result = yield product_services_1.ProductServices.getAllProducts(page, limit, search, category, brand, rating, priceRange);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
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
}));
// Get single product by id
const getSingleProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_services_1.ProductServices.getSingleProductById(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product fetched successfully.',
        data: result,
    });
}));
// Get single product by category
const getProductsByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.params;
    const result = yield product_services_1.ProductServices.getProductsByCategory(categoryName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product fetched by category successfully.',
        data: result,
    });
}));
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
const getAllBrands = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_services_1.ProductServices.getAllBrands();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brands fetched successfully",
        data: result,
    });
}));
// Update product
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { productId } = req.params;
    const result = yield product_services_1.ProductServices.updateProduct(productId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
}));
// Delete product by id
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_services_1.ProductServices.deleteProduct(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
}));
exports.ProductControllers = {
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
