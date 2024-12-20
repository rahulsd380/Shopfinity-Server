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
exports.CartControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cart_service_1 = require("./cart.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Add product to cart
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, sellerId, quantity, } = req.body;
    // console.log(req.body);
    const { productId } = req.params;
    const result = yield cart_service_1.CartServices.addToCart(userId, sellerId, productId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Product added to cart successfully",
        data: result,
    });
}));
// Get all products in the cart
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield cart_service_1.CartServices.getCartProducts(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart products fetched successfully",
        data: result,
    });
});
// Remove product from cart
const removeProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    const result = yield cart_service_1.CartServices.removeProductFromCart(userId, productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product removed from cart successfully",
        data: result,
    });
});
// Update product quantity in the cart
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const result = yield cart_service_1.CartServices.updateQuantity(userId, productId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product quantity updated successfully",
        data: result,
    });
});
exports.CartControllers = {
    addToCart,
    getCartProducts,
    removeProductFromCart,
    updateQuantity,
};
