export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model, Types } from "mongoose";
import { UserRole } from "./auth.constannts";

export type TUser= {
  _id:string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "vendor" | "seller";
  isVerified: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  isDeleted : boolean;
  isSuspended : boolean;
  contactNumber?: string;
  orders?: Types.ObjectId[];
  wishlist?: Types.ObjectId[];
  followings : string[];
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
