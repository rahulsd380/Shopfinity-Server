import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { VendorServices } from "./vendor.service";

const becomeSeller = catchAsync(async (req, res) => {
  const file = req.file;
  // console.log("from controller", file, req.body);
  const result = await VendorServices.becomeSeller(file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registered as vendor successfully",
    data: result,
  });
});

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorServices.getAllVendors();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendors fetched successfully.",
    data: result,
  });
});

const getSingleVendorById = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await VendorServices.getSingleVendorById(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully.",
    data: result,
  });
});

const getMyProducts = catchAsync(async (req, res) => {
  const { sellerId } = req.params;
  const result = await VendorServices.getMyProducts(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully.',
    data: result,
  });
});

const getSingleVendorBySellerId = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await VendorServices.getSingleVendorBySellerId(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully.",
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await VendorServices.getMyShop(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully.",
    data: result,
  });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { vendorId } = req.params;
  const result = await VendorServices.updateVendor(vendorId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor updated successfully.",
    data: result,
  });
});


// For admin (start)
const approveSeller = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await VendorServices.approveSeller(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller request approved.",
    data: result,
  });
});

const rejectRequest = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await VendorServices.rejectRequest(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller request rejected.",
    data: result,
  });
});

const blacklistSeller = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await VendorServices.blacklistSeller(sellerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller blacklisted",
    data: result,
  });
});

const deleteVendor = catchAsync(async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const result = await VendorServices.deleteVendor(vendorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor deleted successfully.",
    data: result,
  });
});

// End


const followVendor = catchAsync(async (req, res) => {

  const result = await VendorServices.followVendor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: result,
  });
});

export const VendorControllers = {
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
