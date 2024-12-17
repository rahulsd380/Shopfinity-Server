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
exports.ProductServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const product_model_1 = __importDefault(require("./product.model"));
const mongoose_1 = require("mongoose");
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
// Create product
const createProduct = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, brand, stock, vendorId } = payload;
    const imageUrls = [];
    // If files are provided, upload them to Cloudinary
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = `${name}-${Date.now()}`;
            const path = file.path;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            imageUrls.push(secure_url);
        }
    }
    const payloadData = {
        name,
        description,
        price,
        category,
        brand,
        stock,
        images: imageUrls,
        createdAt: new Date(),
        vendorId,
    };
    // Create the product
    const result = yield product_model_1.default.create(payloadData);
    yield vendor_model_1.default.findOneAndUpdate({ userId: vendorId }, // Match the vendor by userId
    { $addToSet: { products: result._id } }, // Add the product's _id to the products array
    { new: true } // Return the updated document
    );
    return result;
});
// Add review
const addReview = (productId, userId, userName, rating, reviewText) => __awaiter(void 0, void 0, void 0, function* () {
    const review = {
        userId: new mongoose_1.Types.ObjectId(userId),
        userName,
        reviewId: new mongoose_1.Types.ObjectId(),
        rating,
        reviewText,
        reviewDate: new Date(),
    };
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    product.reviews = product.reviews || [];
    product.reviews.push(review);
    const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const numberOfReviews = product.reviews.length;
    product.ratings = numberOfReviews > 0 ? totalRatings / numberOfReviews : 0;
    product.ratings = parseFloat(product.ratings.toFixed(1));
    const updatedProduct = yield product.save();
    return updatedProduct;
});
// Get all product with filteration
const getAllProducts = (page, limit, search, category, brand, rating, priceRange) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    // Search filter
    const searchFilter = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
            ],
        }
        : {};
    // Category filter
    const categoryFilter = category
        ? { category: { $regex: category, $options: "i" } }
        : {};
    // Brand filter
    const brandFilter = brand
        ? { brand: { $regex: brand, $options: "i" } }
        : {};
    // Rating filter (greater than or equal to the specified rating)
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    // Price range filter (e.g., "100-500")
    const priceFilter = priceRange
        ? {
            price: {
                $gte: Number(priceRange.split("-")[0]),
                $lte: Number(priceRange.split("-")[1]),
            },
        }
        : {};
    // Combined filters
    const filters = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, searchFilter), categoryFilter), brandFilter), ratingFilter), priceFilter);
    const [products, totalProducts] = yield Promise.all([
        product_model_1.default.find(filters).skip(skip).limit(limit),
        product_model_1.default.countDocuments(filters),
    ]);
    return {
        products,
        totalProducts,
    };
});
// Get single product by id
const getSingleProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productId);
    return result;
});
// Get single product by category
const getProductsByCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find({ category: categoryName });
    return result;
});
// const getMyProducts = async (sellerId: string) => {
//   const result = await Product.find({vendorId:sellerId});
//   return result;
// };
// Get all unique brands
const getAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield product_model_1.default.find({ brand: "brand" });
    return brands;
});
// Update product
const updateProduct = (id, payload, productPic) => __awaiter(void 0, void 0, void 0, function* () {
    let productPicUrl;
    if (productPic) {
        const imageName = `${id}-${Date.now()}`;
        const path = productPic.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        productPicUrl = secure_url;
    }
    if (productPicUrl) {
        // Ensure payload.images is an array and append productPicUrl
        payload.images = [...(payload.images || []), productPicUrl];
    }
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete product by id
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(productId);
    return result;
});
exports.ProductServices = {
    createProduct,
    addReview,
    getAllProducts,
    getSingleProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getAllBrands,
    // getMyProducts,
};
