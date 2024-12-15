import { model, Types } from "mongoose";
import { TVendor } from "./vendor.interface";
import { Schema } from "mongoose";

const VendorSchema: Schema<TVendor> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
      required : false
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
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = model<TVendor>("Vendor", VendorSchema);

export default Vendor;
