import mongoose from "mongoose";

type TCartItem = {
  productId: mongoose.Types.ObjectId;
  image : string;
  name: string;
  category: string;
  brand: string;
  stock: string;
  sellerId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

export type TCart= {
  userId: mongoose.Types.ObjectId;
  items: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "purchased";
}