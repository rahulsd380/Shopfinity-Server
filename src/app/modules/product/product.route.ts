import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer.config";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../users/user.constant";

const router = express.Router();

router.post(
  "/create-product",
  multerUpload.array('files', 10),
  auth(UserRole.vendor, UserRole.admin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductControllers.createProduct
);

router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProductById);
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
