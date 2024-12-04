import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { VendorServices } from "./vendor.service";

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const result = await VendorServices.createVendor(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Vendor created successfully.",
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
  const { vendorId } = req.params;
  const result = await VendorServices.getSingleVendorById(vendorId);

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

export const VendorControllers = {
  createVendor,
  getAllVendors,
  getSingleVendorById,
  updateVendor,
  deleteVendor,
};
