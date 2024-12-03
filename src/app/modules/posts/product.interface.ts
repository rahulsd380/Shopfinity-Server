import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  image: string;
  ratings?: number;
  reviews?: { userId: Types.ObjectId; reviewId: Types.ObjectId }[];
  vendorId : { vendorId: Types.ObjectId};
  createdAt: Date;
};