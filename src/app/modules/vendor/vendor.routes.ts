import express, { Request, Response, NextFunction } from "express";
import { multerUpload } from "../../config/multer.config";
import { VendorControllers } from "./vendor.controller";

const router = express.Router();

router.post(
  "/become-seller",
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  VendorControllers.becomeSeller
);

router.get("/", VendorControllers.getAllVendors);
router.get("/:sellerId", VendorControllers.getSingleVendorBySellerId);
router.get("/my-products/:sellerId", VendorControllers.getMyProducts);
router.get("/single/:sellerId", VendorControllers.getSingleVendorById);
router.get("/my-shop/:userId", VendorControllers.getMyShop);
router.put("/follow", VendorControllers.followVendor);
router.put(
  "/update-seller/:vendorId",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  VendorControllers.updateVendor
);
router.delete("/remove-seller/:vendorId", VendorControllers.deleteVendor);

router.put("/approve-seller/:sellerId", VendorControllers.approveSeller);
router.put("/reject-request/:sellerId", VendorControllers.rejectRequest);
router.put("/blacklist-seller/:sellerId", VendorControllers.blacklistSeller);

export const SellerRoutes = router;
