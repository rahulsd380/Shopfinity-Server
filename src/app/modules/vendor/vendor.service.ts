/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TVendor } from "./vendor.interface";
import Vendor from "./vendor.model";

const createVendor = async (payload: TVendor, file: any) => {
    const { shopName, shopDescription, phoneNumber, address } = payload;
  
    // Check if the logo file exists
    let shopLogo: string | undefined;
    if (file && file.path) {
      const imageName = shopName;
      const path = file.path;
  
      // upload the image to Cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      shopLogo = secure_url;
    }
  
    const payloadData = {
      shopName,
      shopDescription,
      shopLogo,
      phoneNumber,
      address,
      products : [],
      followers : [],
      isVerified : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    const result = await Vendor.create(payloadData);
    return result;
  };

const getAllVendors = async () => {
  const result = await Vendor.find({});
  return result;
};

const getSingleVendorById = async (vendorId: string) => {
  const result = await Vendor.findById(vendorId);
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

const deleteVendor = async (vendorId: string) => {
  const result = await Vendor.findByIdAndDelete(vendorId);
  return result;
};

export const VendorServices = {
  createVendor,
  getAllVendors,
  getSingleVendorById,
  updateVendor,
  deleteVendor,
};
