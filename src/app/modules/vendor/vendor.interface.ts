import { Types } from "mongoose";

export type TVendor= {
    userId : Types.ObjectId;
    shopName: string;
    tagline: string;
    supplierName: string;
    sellerName: string;
    shopDescription?: string;
    shopLogo?: string;
    phoneNumber?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    products: string[];
    followers: string[];
    isVerified: boolean;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  