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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const category_model_1 = require("./category.model");
// Create category
const createCategory = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = payload;
    if (file && file.path) {
        const imageName = name;
        const path = file.path;
        // Upload the image to Cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.image = secure_url;
    }
    else {
        throw new Error("Image file is required.");
    }
    const payloadData = {
        name,
        description,
        image: payload.image,
        createdAt: new Date(),
    };
    const result = yield category_model_1.Category.create(payloadData);
    return result;
});
// Get all categories with filtering
const getAllCategories = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const searchFilter = search
        ? {
            $or: [{ name: { $regex: search, $options: "i" } }],
        }
        : {};
    const [categories, totalCategories] = yield Promise.all([
        category_model_1.Category.find(searchFilter).skip(skip).limit(limit),
        category_model_1.Category.countDocuments(searchFilter),
    ]);
    return {
        categories,
        totalCategories,
    };
});
// Get single category by ID
const getSingleCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(categoryId);
    return result;
});
// Update category
const updateCategory = (id, payload, categoryPic) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryPicUrl;
    if (categoryPic) {
        const imageName = `${id}-${Date.now()}`;
        const path = categoryPic.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        categoryPicUrl = secure_url;
    }
    if (categoryPicUrl) {
        payload.image = categoryPicUrl;
    }
    const result = yield category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete category by ID
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete(categoryId);
    return result;
});
exports.CategoryServices = {
    createCategory,
    getAllCategories,
    getSingleCategoryById,
    updateCategory,
    deleteCategory,
};
