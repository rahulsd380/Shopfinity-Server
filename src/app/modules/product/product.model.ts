import { Schema, model, Types } from "mongoose";
import { TProduct } from "./product.interface";


const productSchema = new Schema<TProduct>(
    {
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
        images: { type: [String], required:true},
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: [
            {
                userId: {
                    type: Types.ObjectId,
                    ref: "User",
                },
                reviewId: {
                    type: Types.ObjectId,
                    ref: "Review",
                },
            },
        ],
        vendorId: { type: Types.ObjectId, ref: "Vendor" },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Product = model<TProduct>("Product", productSchema);

export default Product;
