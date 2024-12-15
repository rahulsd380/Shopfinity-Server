"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post("/add-to-cart/:productId", cart_controller_1.CartControllers.addToCart);
router.get("/:userId", cart_controller_1.CartControllers.getCartProducts);
router.delete("/remove-product/:userId/product/:productId", cart_controller_1.CartControllers.removeProductFromCart);
router.put("/update-quantity/:userId/product/:productId", cart_controller_1.CartControllers.updateQuantity);
exports.CartRoutes = router;
