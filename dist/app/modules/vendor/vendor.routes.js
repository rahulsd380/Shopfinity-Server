"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const vendor_controller_1 = require("./vendor.controller");
const router = express_1.default.Router();
router.post("/become-seller", multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, vendor_controller_1.VendorControllers.becomeSeller);
router.get("/", vendor_controller_1.VendorControllers.getAllVendors);
router.get("/:sellerId", vendor_controller_1.VendorControllers.getSingleVendorBySellerId);
router.get("/my-products/:sellerId", vendor_controller_1.VendorControllers.getMyProducts);
router.get("/single/:sellerId", vendor_controller_1.VendorControllers.getSingleVendorById);
router.get("/my-shop/:userId", vendor_controller_1.VendorControllers.getMyShop);
router.put("/follow", vendor_controller_1.VendorControllers.followVendor);
router.put("/update-seller/:vendorId", multer_config_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, vendor_controller_1.VendorControllers.updateVendor);
router.delete("/remove-seller/:vendorId", vendor_controller_1.VendorControllers.deleteVendor);
router.put("/approve-seller/:sellerId", vendor_controller_1.VendorControllers.approveSeller);
router.put("/reject-request/:sellerId", vendor_controller_1.VendorControllers.rejectRequest);
router.put("/blacklist-seller/:sellerId", vendor_controller_1.VendorControllers.blacklistSeller);
exports.SellerRoutes = router;
