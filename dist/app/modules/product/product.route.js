"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
router.post("/create-product", multer_config_1.multerUpload.array('files', 10), (0, auth_1.default)(user_constant_1.UserRole.vendor, user_constant_1.UserRole.seller, user_constant_1.UserRole.admin), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.ProductControllers.createProduct);
// Review on post
router.post("/review/:productId", (0, auth_1.default)(user_constant_1.UserRole.user, user_constant_1.UserRole.vendor, user_constant_1.UserRole.seller, user_constant_1.UserRole.admin), product_controller_1.ProductControllers.addReview);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/:productId", product_controller_1.ProductControllers.getSingleProductById);
router.get("/category/:categoryName", product_controller_1.ProductControllers.getProductsByCategory);
// router.get("/my-products/:sellerId", ProductControllers.getMyProducts);
// Get all brands
router.get("/brands", product_controller_1.ProductControllers.getAllBrands);
router.put("/update-product/:productId", multer_config_1.multerUpload.array('files', 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.ProductControllers.updateProduct);
router.delete("/delete-product/:productId", product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
