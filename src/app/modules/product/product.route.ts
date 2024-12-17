import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer.config";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../users/user.constant";

const router = express.Router();

router.post(
  "/create-product",
  multerUpload.array('files', 10),
  auth(UserRole.vendor, UserRole.seller, UserRole.admin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductControllers.createProduct
);


// Review on post
router.post(
  "/review/:productId",
  auth(UserRole.user, UserRole.vendor, UserRole.seller, UserRole.admin),
  ProductControllers.addReview
);

router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProductById);
router.get("/category/:categoryName", ProductControllers.getProductsByCategory);
// router.get("/my-products/:sellerId", ProductControllers.getMyProducts);
// Get all brands
router.get("/brands", ProductControllers.getAllBrands);

router.put(
  "/update-product/:productId",
  multerUpload.array('files', 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductControllers.updateProduct
);
router.delete("/delete-product/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;
