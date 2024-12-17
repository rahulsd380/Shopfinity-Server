"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    images: { type: [String], required: true },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: [
        {
            userId: {
                type: mongoose_1.Types.ObjectId,
                ref: "User",
            },
            userName: { type: String },
            reviewId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Review",
            },
            rating: { type: Number, required: true },
            reviewDate: {
                type: Date,
                default: Date.now,
            },
            reviewText: { type: String, required: true }
        },
    ],
    vendorId: { type: mongoose_1.Types.ObjectId, ref: "Vendor" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
