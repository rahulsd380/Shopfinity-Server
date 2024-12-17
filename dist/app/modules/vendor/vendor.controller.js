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
exports.VendorControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const vendor_service_1 = require("./vendor.service");
const becomeSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    // console.log("from controller", file, req.body);
    const result = yield vendor_service_1.VendorServices.becomeSeller(file, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Registered as vendor successfully",
        data: result,
    });
}));
const getAllVendors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.VendorServices.getAllVendors();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendors fetched successfully.",
        data: result,
    });
}));
const getSingleVendorById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.getSingleVendorById(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor fetched successfully.",
        data: result,
    });
}));
const getMyProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.getMyProducts(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product fetched successfully.',
        data: result,
    });
}));
const getSingleVendorBySellerId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.getSingleVendorBySellerId(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor fetched successfully.",
        data: result,
    });
}));
const getMyShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield vendor_service_1.VendorServices.getMyShop(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor fetched successfully.",
        data: result,
    });
}));
const updateVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { vendorId } = req.params;
    const result = yield vendor_service_1.VendorServices.updateVendor(vendorId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor updated successfully.",
        data: result,
    });
}));
// For admin (start)
const approveSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.approveSeller(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Seller request approved.",
        data: result,
    });
}));
const rejectRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.rejectRequest(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Seller request rejected.",
        data: result,
    });
}));
const blacklistSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const result = yield vendor_service_1.VendorServices.blacklistSeller(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Seller blacklisted",
        data: result,
    });
}));
const deleteVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const result = yield vendor_service_1.VendorServices.deleteVendor(vendorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor deleted successfully.",
        data: result,
    });
}));
// End
const followVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.VendorServices.followVendor(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User followed successfully',
        data: result,
    });
}));
exports.VendorControllers = {
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
