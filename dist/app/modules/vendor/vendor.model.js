"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const VendorSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    tagline: {
        type: String,
        trim: true,
    },
    supplierName: {
        type: String,
        required: true,
        trim: true,
    },
    sellerName: {
        type: String,
        required: true,
        trim: true,
    },
    shopDescription: {
        type: String,
        trim: true,
    },
    shopLogo: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    products: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Product",
        },
    ],
    followers: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
    },
}, {
    timestamps: true,
});
const Vendor = (0, mongoose_1.model)("Vendor", VendorSchema);
exports.default = Vendor;
