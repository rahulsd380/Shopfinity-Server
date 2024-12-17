/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { User } from "../auth/auth.model";
import Product from "../product/product.model";
import { TVendor } from "./vendor.interface";
import Vendor from "./vendor.model";

const becomeSeller = async (file: any, payload: Partial<TVendor>) => {
  console.log(file);
  const {
    userId,
    shopName,
    tagline,
    supplierName,
    sellerName,
    shopDescription,
    phoneNumber,
    address
  } = payload;

  if (file && file.path) {
    const imageName = `${shopName}`;
    const path = file.path;

    // Upload the image to Cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    console.log(secure_url);
    payload.shopLogo = secure_url;
  }

  const payloadData = {
    userId,
    shopName,
    tagline,
    supplierName,
    sellerName,
    shopDescription,
    shopLogo: payload.shopLogo,
    phoneNumber,
    address,
    createdAt: new Date(),
    status: "pending"
  };

  const result = await Vendor.create(payloadData);
  return result;
};


const getAllVendors = async () => {
  const result = await Vendor.find({});
  return result;
};

const getSingleVendorById = async (sellerId: string) => {
  const result = await Vendor.findById(sellerId);
  return result;
};

// For seller to get their added products
const getMyProducts = async (sellerId: string) => {
  const result = await Product.find({vendorId:sellerId});
  return result;
};


const getSingleVendorBySellerId = async (sellerId: string) => {
  const result = await Vendor.findOne({userId:sellerId});
  return result;
};

const getMyShop = async (userId: string) => {
  const result = await Vendor.findOne({ userId: userId });
  return result;
};

const updateVendor = async (vendorId: string, payload: Partial<TVendor>, file: any) => {
  if (file && file.path) {
    const imageName = `${vendorId}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.shopLogo = secure_url;
  }

  const result = await Vendor.findByIdAndUpdate(vendorId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const approveSeller = async (vendorId: string) => {
  const vendor =await Vendor.findByIdAndUpdate(vendorId,
    {
      status: "approved"
    },
    {
      new: true,
      runValidators: true,
    });

    const result = await User.findByIdAndUpdate(
      vendor?.userId,
      {
        role: 'seller',
      },
      {
        new: true,
      }
    );

  return result;
};

const rejectRequest = async (sellerId: string) => {
  const result = await Vendor.findByIdAndUpdate(sellerId,
    {
      status: "rejected"
    },
    {
      new: true,
      runValidators: true,
    });

  return result;
};

const blacklistSeller = async (sellerId: string) => {
  const result = await Vendor.findByIdAndUpdate(sellerId,
    {
      status: "blacklisted"
    },
    {
      new: true,
      runValidators: true,
    });

  return result;
};

const deleteVendor = async (vendorId: string) => {
  const result = await Vendor.findByIdAndDelete(vendorId);
  return result;
};

const followVendor = async (payload : {userId:string, vendorId:string}) => {
  const user = await User.findByIdAndUpdate(
    payload.userId,
    { $addToSet: { followings: payload.vendorId } },
    { new: true }
  );

  const targetUser = await Vendor.findByIdAndUpdate(
    payload.vendorId,
    { $addToSet: { followers: payload.userId } },
    { new: true }
  );

  return { user, targetUser };
};

export const VendorServices = {
  becomeSeller,
  getAllVendors,
  getSingleVendorById,
  getSingleVendorBySellerId,
  getMyShop,
  updateVendor,
  deleteVendor,

  approveSeller,
  rejectRequest,
  blacklistSeller,
  followVendor,
  getMyProducts,
};
