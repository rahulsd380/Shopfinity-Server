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
exports.VendorServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_model_1 = require("../auth/auth.model");
const product_model_1 = __importDefault(require("../product/product.model"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
const becomeSeller = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(file);
    const { userId, shopName, tagline, supplierName, sellerName, shopDescription, phoneNumber, address } = payload;
    if (file && file.path) {
        const imageName = `${shopName}`;
        const path = file.path;
        // Upload the image to Cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        console.log(secure_url);
        payload.shopLogo = secure_url;
    }
    const payloadData = {
        userId,
        shopName,
        tagline,
        supplierName,
        sellerName,
        shopDescription,
        shopLogo: payload.shopLogo,
        phoneNumber,
        address,
        createdAt: new Date(),
        status: "pending"
    };
    const result = yield vendor_model_1.default.create(payloadData);
    return result;
});
const getAllVendors = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.find({});
    return result;
});
const getSingleVendorById = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findById(sellerId);
    return result;
});
// For seller to get their added products
const getMyProducts = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find({ vendorId: sellerId });
    return result;
});
const getSingleVendorBySellerId = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findOne({ userId: sellerId });
    return result;
});
const getMyShop = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findOne({ userId: userId });
    return result;
});
const updateVendor = (vendorId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file && file.path) {
        const imageName = `${vendorId}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.shopLogo = secure_url;
    }
    const result = yield vendor_model_1.default.findByIdAndUpdate(vendorId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const approveSeller = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield vendor_model_1.default.findByIdAndUpdate(vendorId, {
        status: "approved"
    }, {
        new: true,
        runValidators: true,
    });
    const result = yield auth_model_1.User.findByIdAndUpdate(vendor === null || vendor === void 0 ? void 0 : vendor.userId, {
        role: 'seller',
    }, {
        new: true,
    });
    return result;
});
const rejectRequest = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findByIdAndUpdate(sellerId, {
        status: "rejected"
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const blacklistSeller = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findByIdAndUpdate(sellerId, {
        status: "blacklisted"
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteVendor = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.findByIdAndDelete(vendorId);
    return result;
});
const followVendor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findByIdAndUpdate(payload.userId, { $addToSet: { followings: payload.vendorId } }, { new: true });
    const targetUser = yield vendor_model_1.default.findByIdAndUpdate(payload.vendorId, { $addToSet: { followers: payload.userId } }, { new: true });
    return { user, targetUser };
});
exports.VendorServices = {
    becomeSeller,
    getAllVendors,
    getSingleVendorById,
    getSingleVendorBySellerId,
    getMyShop,
    updateVendor,
    deleteVendor,
    approveSeller,
    rejectRequest,
    blacklistSeller,
    followVendor,
    getMyProducts,
};
