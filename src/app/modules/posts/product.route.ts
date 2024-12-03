import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer.config";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../users/user.constant";

const router = express.Router();

router.post(
  "/create-product",
  multerUpload.single('file'),
  // auth(UserRole.vendor, UserRole.admin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductControllers.createProduct
);

// router.get("/", ProductControllers.getAllPosts);
// router.put(
//   "/edit-post/:postId",
//   multerUpload.array("files", 10),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   PostControllers.updatePost
// );
// router.put("/edit-comment/:commentId", PostControllers.editComment);
// router.delete("/delete-post/:postId", PostControllers.deletePost);
// router.get("/:postId", PostControllers.getSinglePostById);
// router.post("/:postId/upvote", PostControllers.upvotePost);
// router.post("/:postId/downvote", PostControllers.downvotePost);
// router.post("/:postId/comment", PostControllers.addComment);
// router.get("/most-upvoted", PostControllers.getMostUpvotedPost);
// router.delete("/:postId/comment/:commentId", PostControllers.deleteComment);

export const ProductRoutes = router;
