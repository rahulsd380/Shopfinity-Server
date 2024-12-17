import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  ratings?: number;
  reviews?: { userId: Types.ObjectId; userName:string; reviewId: Types.ObjectId, rating:number, reviewText: string, reviewDate: Date }[];
  vendorId : { vendorId: Types.ObjectId};
  createdAt: Date;
};