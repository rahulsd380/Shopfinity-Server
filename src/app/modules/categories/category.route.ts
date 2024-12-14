import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer.config";
import { CategoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../users/user.constant";

const router = express.Router();

// Create category
router.post(
  "/create-category",
  auth("admin"),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CategoryControllers.createCategory
);

// Get all categories
router.get("/", CategoryControllers.getAllCategories);

// Get single category by ID
router.get("/:categoryId", CategoryControllers.getSingleCategoryById);

// Update category
router.put(
  "/update-category/:categoryId",
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(UserRole.admin),
  CategoryControllers.updateCategory
);

// Delete category by ID
router.delete(
  "/delete-category/:categoryId",
  auth(UserRole.admin),
  CategoryControllers.deleteCategory
);

export const CategoryRoutes = router;
