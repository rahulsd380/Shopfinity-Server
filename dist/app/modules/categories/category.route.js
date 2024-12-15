"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
// Create category
router.post("/create-category", (0, auth_1.default)("admin"), multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, category_controller_1.CategoryControllers.createCategory);
// Get all categories
router.get("/", category_controller_1.CategoryControllers.getAllCategories);
// Get single category by ID
router.get("/:categoryId", category_controller_1.CategoryControllers.getSingleCategoryById);
// Update category
router.put("/update-category/:categoryId", multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.default)(user_constant_1.UserRole.admin), category_controller_1.CategoryControllers.updateCategory);
// Delete category by ID
router.delete("/delete-category/:categoryId", (0, auth_1.default)(user_constant_1.UserRole.admin), category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
