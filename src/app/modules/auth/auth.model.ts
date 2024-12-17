import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser, UserModel } from "./auth.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor", "seller"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    isDeleted : {type:Boolean, default:false},
    isSuspended : {type:Boolean, default:false},
    contactNumber: {
      type: String,
      trim: true,
    },
    orders: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
    wishlist: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
    followings : {type : [String], default : []}
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
