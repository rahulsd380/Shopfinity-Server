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
exports.CartServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("../product/product.model"));
const cart_model_1 = __importDefault(require("./cart.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Add product to cart
const addToCart = (userId, sellerId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid product ID");
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    // Check if the product already exists in the cart
    let cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        // If no cart exists, create a new one
        cart = new cart_model_1.default({
            userId,
            items: [
                {
                    productId: product._id,
                    sellerId,
                    image: product.images[0],
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    stock: product.stock,
                    price: product.price,
                    quantity,
                },
            ],
            status: "active",
        });
    }
    else {
        const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        }
        else {
            cart.items.push({
                productId: product._id,
                sellerId,
                image: product.images[0],
                name: product.name,
                category: product.category,
                brand: product.brand,
                stock: product.stock,
                price: product.price,
                quantity,
            });
        }
    }
    yield cart.save();
    return cart;
});
// Get products in the cart
const getCartProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.default.findOne({ userId });
    return result;
});
// Remove product from cart
const removeProductFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart)
        throw new Error("Cart not found");
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1)
        throw new Error("Product not found in cart");
    cart.items.splice(itemIndex, 1); // Remove the product from the cart
    yield cart.save();
    return cart.items;
});
// Update product quantity in the cart
const updateQuantity = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found in cart");
    // Update the quantity
    item.quantity = quantity;
    yield cart.save();
    return cart.items;
});
exports.CartServices = {
    addToCart,
    getCartProducts,
    removeProductFromCart,
    updateQuantity,
};
