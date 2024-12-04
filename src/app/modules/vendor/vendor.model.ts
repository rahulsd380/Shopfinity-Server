import { model, Types } from "mongoose";
import { TVendor } from "./vendor.interface";
import { Schema } from "mongoose";

const VendorSchema: Schema<TVendor> = new Schema(
    {
        shopName: {
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
            trim: true,
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
                type: Types.ObjectId,
                ref: "Product",
            },
        ],
        followers: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Vendor = model<TVendor>("Vendor", VendorSchema);

export default Vendor;