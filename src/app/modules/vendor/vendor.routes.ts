import express, { Request, Response, NextFunction } from "express";
import { multerUpload } from "../../config/multer.config";
import { VendorControllers } from "./vendor.controller";

const router = express.Router();

router.post(
  "/create-vendor",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  VendorControllers.createVendor
);

router.get("/", VendorControllers.getAllVendors);
router.get("/:vendorId", VendorControllers.getSingleVendorById);
router.put(
  "/update-vendor/:vendorId",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  VendorControllers.updateVendor
);
router.delete("/delete-vendor/:vendorId", VendorControllers.deleteVendor);

export const VendorRoutes = router;
