/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
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
  const result = await Vendor.findByIdAndUpdate(vendorId,
    {
      status: "approved"
    },
    {
      new: true,
      runValidators: true,
    });

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

export const VendorServices = {
  becomeSeller,
  getAllVendors,
  getSingleVendorById,
  getMyShop,
  updateVendor,
  deleteVendor,

  approveSeller,
  rejectRequest,
  blacklistSeller,
};
